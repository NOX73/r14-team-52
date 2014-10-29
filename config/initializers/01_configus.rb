Configus.build Rails.env do # set current environment
  env :production do
    admin_password              "B89kQEViMLtMnUqJM9EMW5"
    facebook_key                "302407919953094"
    facebook_secret             "9f7d2507f4149db6bd7f5fd6e13c4964"
    ga_treker                   "UA-55882831-1"
    github_key                  "faba0c6dd9f9577808cd"
    github_secret               "326245699a7c23282af484122ff971f0af8f61e5"
    s3_bucket_name              "point7"
    s3_key                      "AKIAJZF2OA67SOKDH2KQ"
    s3_region                   "us-west-2"
    s3_secret                   "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"
    secret_key_base             "972bb750e472877df249e30fc706bba4a7b130414ef3f88c12c7431b2a9f21ba435cf210ef972ab08c2c80235ef3bfa2e488f0345718c6c801911c247b6ac477"
  end

  env :development, :parent => :production do
    secret_key_base             "87990C7F977A95AE03DA6F58509EBAE7877E875A5DC77E565AB825E0C91DC9C23CF2A44F335212470E4682BCE9887A11E90D4FC2F8BC2283B90C9A2CEE986F9B"
    facebook_key                ''
    facebook_secret             ''
    github_key                  ''
    github_secret               ''
    admin_password              "T9W5CTU2UDKUGHIKK78D17"
    ga_treker                   ''
  end

  env :test, :parent => :development do
  end
end
