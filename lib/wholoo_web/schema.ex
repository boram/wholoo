defmodule WholooWeb.Schema do
  use Absinthe.Schema
  alias Wholoo.{Repo, Accounts}

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
      resolve fn params, _ ->
        case Accounts.create_user(params) do
          {:ok, user} -> {:ok, user}
          {:error, changeset} -> {:error, changeset.errors}
        end
      end
    end
  end
end
