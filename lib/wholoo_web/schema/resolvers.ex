defmodule WholooWeb.Resolvers.Accounts do
  alias Wholoo.{Accounts, Utils}

  def create(params, _) do
    case Accounts.create_user(params) do
      {:ok, user} -> {:ok, user}
      {:error, changeset} ->
        {
          :error,
          message: "Sign up failed",
          details: Utils.errors_on(changeset)
        }
    end
  end
end
