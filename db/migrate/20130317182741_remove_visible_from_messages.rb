class RemoveVisibleFromMessages < ActiveRecord::Migration
  def up
    remove_column :messages, :visible
  end

  def down
    add_column :messages, :visible, :boolean
  end
end
