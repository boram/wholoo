defmodule WholooWeb.Schema do
  use Absinthe.Schema
  alias Wholoo.{Repo, Accounts}
  alias WholooWeb.Resolvers

  @desc "User type"
  object :user do
    field :id, :id
    field :email, :string
  end

  @desc "General input error type"
  object :input_error do
    field :key, non_null(:string)
    field :message, non_null(:string)
  end

  @desc "User resource payload type"
  object :user_result do
    field :errors, list_of(:input_error)
    field :user, :user
  end

  @desc "User session type"
  object :session do
    field :auth_token, :string
    field :user, :user
  end

  query do
    field :users, list_of(:user) do
      resolve fn _, _ ->
        {:ok, Repo.all(Accounts.User)}
      end
    end

    @desc "Get the currently authenticated user"
    field :current_user, :user do
      resolve &Resolvers.Accounts.get_current_user/2
    end
  end

  mutation do
    @desc "Sign up user"
    field :signup, :user_result do
      arg :email, non_null(:string)
      arg :password, non_null(:string)
      resolve &Resolvers.Accounts.create/2
    end

    @desc "Log in user"
    field :login, :session do
      arg :email, non_null(:string)
      arg :password, non_null(:string)
      resolve &Resolvers.Accounts.login/2
    end
  end
end
