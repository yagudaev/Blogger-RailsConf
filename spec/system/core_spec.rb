require 'rails_helper'

describe 'Core Features', js: true do
  before { visit '/' }

  describe 'List posts' do
    let!(:posts) { [create(:post, title: 'post 1'), create(:post, title: 'post 2')]}

    it 'should show all the post' do
      expect(page).to have_content('post 1')
      expect(page).to have_content('post 2')
    end
  end

  describe 'Create a post' do
    it 'should let me create a post' do
      fill_in 'title', with: 'post 3'
      fill_in 'content', with: 'Content goes here'
      click_on 'Save'
      expect(page).to have_content('post 3')
    end
  end

  describe 'Update a post' do
    it 'should let me edit the post' do
      # click_on 'edit'
      # fill_in
    end
  end

  describe 'Delete a post' do
  end
end
