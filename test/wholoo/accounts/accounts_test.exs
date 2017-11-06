defmodule Wholoo.AccountsTest do
  use Wholoo.DataCase
  alias Wholoo.Accounts
  alias Wholoo.Accounts.User

  describe "list_users/0" do
    test "returns all users" do
      user = insert_user()
      users = Accounts.list_users()
      user_ids = Enum.map(users, fn user -> user.id end)
      assert user_ids == [user.id]
    end
  end

  describe "get_user!/1" do
    test "returns the user with given id" do
      user = insert_user()
      assert Accounts.get_user!(user.id).id == user.id
    end
  end

  describe "create_user/1" do
    test "creates a user" do
      attrs = %{email: "user@example.com", password: "password"}

      assert {:ok, %User{} = user} = Accounts.create_user(attrs)
      assert user.email == attrs.email
    end

    test "returns an error when email is blank" do
      attrs = %{email: "", password: "password"}

      assert {:error, changeset} = Accounts.create_user(attrs)
      assert [%{key: :email, message: ["can't be blank"]}] = errors_on(changeset)
    end

    test "returns an error when email is malformed" do
      attrs = %{email: "malformed_email", password: "password"}

      assert {:error, changeset} = Accounts.create_user(attrs)
      assert [%{key: :email, message: ["has invalid format"]}] = errors_on(changeset)
    end

    test "returns an error when email exists" do
      attrs = %{email: "user@example.com", password: "password"}
      insert_user(attrs)

      assert {:error, changeset} = Accounts.create_user(attrs)
      assert [%{key: :email, message: ["has already been taken"]}] = errors_on(changeset)
    end

    test "returns an error when password is blank" do
      attrs = %{email: "user@example.com", password: ""}

      assert {:error, changeset} = Accounts.create_user(attrs)
      assert [%{key: :password, message: ["can't be blank"]}] = errors_on(changeset)
    end

    test "returns an error when password is invalid" do
      attrs = %{email: "user@example.com", password: "short"}

      assert {:error, changeset} = Accounts.create_user(attrs)
      assert [%{key: :password, message: ["should be at least 6 character(s)"]}] =
        errors_on(changeset)
    end
  end

  describe "update_user/2" do
    test "updates the user" do
      user = insert_user(%{email: "user@example.com", password: "password"})
      attrs = %{email: "alias@example.com", password: "password"}

      assert {:ok, user} = Accounts.update_user(user, attrs)
      assert user.email == attrs.email
    end

    test "returns an error when email is malformed" do
      user = insert_user(%{email: "user@example.com", password: "password"})
      attrs = %{email: "malformed_email", password: "password"}

      assert {:error, changeset} = Accounts.update_user(user, attrs)
      assert [%{key: :email, message: ["has invalid format"]}] = errors_on(changeset)
    end
  end

  describe "delete_user/1 " do
    test "deletes the user" do
      user = insert_user()
      assert {:ok, %User{}} = Accounts.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user!(user.id) end
    end
  end

  describe "change_user/1" do
    test "returns a user changeset" do
      user = insert_user()
      assert %Ecto.Changeset{} = Accounts.change_user(user)
    end
  end

  defp insert_user(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(%{email: "foo@example.com", password: "foobar"})
      |> Accounts.create_user()
    user
  end
end
