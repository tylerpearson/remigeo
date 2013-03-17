class ChangeHiddenAtInMessages < ActiveRecord::Migration
  def self.up
   change_column :messages, :hidden_at, :datetime
  end

  def self.down
   change_column :messages, :hidden_at, :date
  end
end
