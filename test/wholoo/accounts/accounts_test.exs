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
    @valid_attrs %{email: "foo@example.com", password: "foobar"}
    @invalid_attrs %{email: "not_an_email", password: "fiver"}
    @blank_attrs %{email: nil, password: nil}

    test "creates a user" do
      assert {:ok, %User{} = user} = Accounts.create_user(@valid_attrs)
      assert user.email == @valid_attrs[:email]
    end

    test "returns an error when email is blank" do
      assert {:error, changeset} = Accounts.create_user(@blank_attrs)
      assert %{email: ["can't be blank"]} = errors_on(changeset)
    end

    test "returns an error when email is malformed" do
      assert {:error, changeset} = Accounts.create_user(@invalid_attrs)
      assert %{email: ["has invalid format"]} = errors_on(changeset)
    end

    test "returns an error when email exists" do
      insert_user()
      assert {:error, changeset} = Accounts.create_user(@valid_attrs)
      assert %{email: ["has already been taken"]} = errors_on(changeset)
    end

    test "returns an error when password is blank" do
      assert {:error, changeset} = Accounts.create_user(@blank_attrs)
      assert %{password: ["can't be blank"]} = errors_on(changeset)
    end

    test "returns an error when password is invalid" do
      assert {:error, changeset} = Accounts.create_user(@invalid_attrs)
      assert %{password: ["should be at least 6 character(s)"]} = errors_on(changeset)
    end
  end

  describe "update_user/2" do
    @valid_update_attrs %{email: "bar@example.com"}
    @invalid_update_attrs %{email: "not_an_email"}

    test "updates the user" do
      user = insert_user()
      assert {:ok, user} = Accounts.update_user(user, @valid_update_attrs)
      assert %User{} = user
      assert user.email == @valid_update_attrs[:email]
    end

    test "returns an error when email is malformed" do
      user = insert_user()
      assert {:error, changeset} = Accounts.update_user(user, @invalid_update_attrs)
      assert %{email: ["has invalid format"]} = errors_on(changeset)
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
