class Web::UserSessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    if @user = login(user_params[:email], user_params[:password])
      redirect_back_or_to(:videos, notice: 'Login successful')
    else
      flash.now[:alert] = 'Login failed'
      render action: 'new'
    end
  end

  def destroy
    logout
    redirect_to(:root, notice: 'Logged out!')
  end

  private

    def user_params
      params.require(:user).permit(:email, :password)
    end
end
