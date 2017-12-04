# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :wholoo,
  ecto_repos: [Wholoo.Repo]

# Configures the endpoint
config :wholoo, WholooWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "hclhTrxoUSLRsZ/fPCLn7f1iZ41xG0aGUDCzEgZF3A8er7dt1yzqLeVb0VQY6wVG",
  render_errors: [view: WholooWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Wholoo.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :guardian, Guardian,
  allowed_algos: ["HS512"],
  verify_module: Guardian.JWT,
  issuer: "Wholoo",
  ttl: { 30, :days },
  verify_issuer: true,
  secret_key: "Q/pRXuJQoZblGk4AIOHhMX0AkzuUpBS91hQVlO06PqrtRd/iAobc3CdBkMPDVYgc",
  serializer: WholooWeb.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
