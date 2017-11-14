defmodule WholooWeb.Router do
  use WholooWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :protect_from_forgery
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
    plug WholooWeb.Context
  end

  scope "/api" do
    pipe_through :api

    forward "/", Absinthe.Plug,
      schema: WholooWeb.Schema
  end

  forward "/graphiql",
    Absinthe.Plug.GraphiQL,
    schema: WholooWeb.Schema,
    interface: :simple

  scope "/", WholooWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/*path", AppController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", WholooWeb do
  #   pipe_through :api
  # end
end
