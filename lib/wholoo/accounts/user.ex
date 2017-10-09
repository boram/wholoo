defmodule Wholoo.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Wholoo.Accounts.User

  schema "users" do
    field :email, :string
    field :password, :string, virtual: true
    field :password_hash, :string

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email])
    |> validate_required([:email])
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email)
  end

  @doc false
  def registration_changeset(%User{} = user, attrs) do
    user
    |> changeset(attrs)
    |> cast(attrs, [:password])
    |> validate_required([:password])
    |> validate_length(:password, min: 6)
    |> write_password()
  end

  defp write_password(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password_value}} ->
        put_change(changeset, :password_hash, Comeonin.Argon2.hashpwsalt(password_value))
      _ ->
        changeset
    end
  end
end
