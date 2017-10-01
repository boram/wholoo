defmodule WholooWeb.PageController do
  use WholooWeb, :controller
  plug :put_layout, "page.html"

  def index(conn, _params) do
    render conn, "index.html"
  end
end
