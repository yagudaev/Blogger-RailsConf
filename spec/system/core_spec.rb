require 'rails_helper'

describe 'Core Features', js: true do


  describe 'List posts' do
    let!(:posts) { [create(:post, title: 'post 1'), create(:post, title: 'post 2')]}
    before { visit '/' }

    it 'should show all the post' do
      expect(page).to have_content('post 1')
      expect(page).to have_content('post 2')
    end
  end

  describe 'Create a post' do
    before { visit '/' }

    it 'should let me create a post' do
      fill_in 'title', with: 'post 3'
      fill_in 'content', with: 'Content goes here'
      click_on 'Save'
      expect(page).to have_content('post 3')
    end
  end

  describe 'Update a post' do
    let!(:post) { create(:post, title: 'old title', content: 'content') }
    before { visit '/' }

    it 'should let me edit the post' do
      find('a', text: 'Edit').click
      fill_in 'title', currently_with: 'old title', with: 'new title'
      find(:xpath, "(//button[text()='Save'])[2]").click
      expect(page).to have_content('new title')
    end
  end

  describe 'Delete a post' do
    let!(:post) { create(:post, title: 'Cannot touch this') }
    before { visit '/' }

    it 'should delete the post' do
      find('a', text: 'Delete').click
      expect(page).not_to have_content('Cannout touch this')
    end
  end
end
