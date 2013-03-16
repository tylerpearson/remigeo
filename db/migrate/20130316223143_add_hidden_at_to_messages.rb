class AddHiddenAtToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :hidden_at, :date
  end
end
