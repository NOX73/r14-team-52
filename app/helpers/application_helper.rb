module ApplicationHelper
  def ga_treker
    ENV.fetch("GA_TREKER")
  end
end
