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
end
