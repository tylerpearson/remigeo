class MessagesController < ApplicationController

  before_filter :authenticate_user!

  # GET /messages
  # GET /messages.json
  def index
    if params[:search]
      @messages = current_user.messages.search(params[:search])
    else
      @messages = current_user.messages
    end

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @messages.to_json(:include => [:location]) }
    end
  end

  # GET /messages/1
  # GET /messages/1.json
  def show
    @message = Message.find(params[:id])

    if current_user.id != @message.user_id
      redirect_to root_path
    else
      respond_to do |format|
        format.html # show.html.erb
        format.json { render json: @message.to_json(:include => :location) }
      end

    end
  end

  # GET /messages/new
  # GET /messages/new.json
  def new
    @message = Message.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @message }
    end
  end

  # GET /messages/1/edit
  def edit
    @message = Message.find(params[:id])
    if current_user.id != @message.user_id
      redirect_to root_path
    end
  end

  # POST /messages
  # POST /messages.json
  def create
    @message = Message.new(params[:message])

    location = Location.find_or_create_by_foursquare_location_id(params[:foursquare_location_id])
    @message.location_id = location.id

    @message.user_id = current_user.id

    respond_to do |format|
      if @message.save
        format.html { redirect_to @message, notice: 'Message was successfully created.' }
        format.json { render json: @message, status: :created, location: @message }
      else
        format.html { render action: "new" }
        format.json { render json: @message.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /messages/1
  # PUT /messages/1.json
  def update
    @message = Message.find(params[:id])

    if current_user.id != @message.user_id
      redirect_to root_path
    else
      respond_to do |format|
        if @message.update_attributes(params[:message])
          format.html { redirect_to @message, notice: 'Message was successfully updated.' }
          format.json { head :no_content }
        else
          format.html { render action: "edit" }
          format.json { render json: @message.errors, status: :unprocessable_entity }
        end
      end
    end
  end

  # DELETE /messages/1
  # DELETE /messages/1.json
  def destroy
    @message = Message.find(params[:id])
    @message.destroy

    respond_to do |format|
      format.html { redirect_to messages_url }
      format.json { head :no_content }
    end
  end

  # GET nearby.json
  def nearby
    unless params[:latitude] and params[:longitude]
      result = request.location
      @locations = current_user.locations.near(result.coordinates, 1, :order => :distance)
    else
      @latitude   = params[:latitude]
      @longitude  = params[:longitude]
      @locations = current_user.locations.near([@latitude,@longitude], 1, :order => :distance)
    end

    respond_to do |format|
      format.json { render json: @locations.to_json(:include => :messages) }
      format.html
    end

  end


  # hide messages
  def hide



  end

end
