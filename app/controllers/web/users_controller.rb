class Web::UsersController < Web::ApplicationController

  # GET /users/new
  def new
    @user = User.new
  end

  # POST /users
  def create
    @user = params[:user] ? User.new(user_params) : User.new_guest

    if @user.save
      auto_login(@user)
      redirect_to :videos, notice: 'User was successfully created.'
    else
      render :new
    end
  end

  private

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
