class RemoveHiddenAtFromMessages < ActiveRecord::Migration
  def up
    remove_column :messages, :hidden_at
  end

  def down
    add_column :messages, :hidden_at, :datetime
  end
end
