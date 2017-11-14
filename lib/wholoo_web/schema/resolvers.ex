defmodule WholooWeb.Resolvers.Accounts do
  alias Wholoo.{Accounts, Utils}

  def create(params, _) do
    case Accounts.create_user(params) do
      {:ok, user} ->
        {:ok, %{user: user}}
      {:error, changeset} ->
        {:ok, %{errors: Utils.errors_on(changeset)}}
    end
  end

  def login(params, _) do
    with {:ok, user} <- Wholoo.Accounts.authenticate(params[:email], params[:password]),
         {:ok, jwt, _} <- Guardian.encode_and_sign(user, :access) do
      {:ok, %{auth_token: jwt, user: user}}
    else
      _ ->
        {:error, message: "Invalid credentials"}
    end
  end
end
