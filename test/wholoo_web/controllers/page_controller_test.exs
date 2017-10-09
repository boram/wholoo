defmodule WholooWeb.PageControllerTest do
  use WholooWeb.ConnCase
  import Phoenix.Controller

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert view_template(conn) =~ "index.html"
  end
end
