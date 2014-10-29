SMTP_SETTINGS = {
  address: configus.smtp_address, # example: "smtp.sendgrid.net"
  authentication: :plain,
  domain: configus.smtp_domain, # example: "this-app.com"
  enable_starttls_auto: true,
  password: configus.smtp_password,
  port: "587",
  user_name: configus.smtp_username
}
