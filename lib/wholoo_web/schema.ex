defmodule WholooWeb.Schema do
  use Absinthe.Schema
  alias Wholoo.{Repo, Accounts}
  alias WholooWeb.Resolvers

  @desc "User"
  object :user do
    field :id, :id
    field :email, :string
  end

  query do
    field :users, list_of(:user) do
      resolve fn _, _ ->
        {:ok, Repo.all(Accounts.User)}
      end
    end
  end

  @desc "Create user"
  mutation do
    field :signup, :user do
      arg :email, non_null(:string)
      arg :password, non_null(:string)
      resolve &Resolvers.Accounts.create/2
    end
  end
end
