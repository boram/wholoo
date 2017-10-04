defmodule WholooWeb.LayoutView do
  use WholooWeb, :view

  @doc """
  Generates the current page's title for the <title /> tag.

  The second argument `site_name` defaults to the name of this website.

  If the current view module exports a `title` function that returns
  `Log In Page`, then a page title is generated in the format:

  `Log In Page - Wholoo`

  If the current view module does not export a `title` function, then
  the generated page title is simple

  `Wholoo`
  """
  def title(conn, site_name \\ "Wholoo") do
    if Kernel.function_exported?(view_module(conn), :title, 0) do
      view_module(conn).title <> " - " <> site_name
    else
      site_name
    end
  end

  @doc """
  Generates the body class from the view module and template names
  """
  def body_class(conn) do
    view_name(conn) <> "-" <> template_name(conn)
  end

  # Takes the view module name and returns a parameterized name for it.
  # `WholooWeb.PageView` -> `page`.
  defp view_name(conn) do
    [name | _] = Regex.run(~r/.+\.(.*)View$/,
                           Atom.to_string(view_module(conn)),
                           capture: :all_but_first)
    String.downcase(name)
  end

  # Takes the view template name and returns a parameterized name for it.
  # `index.html` -> `index`.
  defp template_name(conn) do
    view_template(conn)
    |> String.split(".")
    |> Enum.at(0)
  end
end
