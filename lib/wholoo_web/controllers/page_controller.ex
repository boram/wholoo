defmodule WholooWeb.PageController do
  use WholooWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
