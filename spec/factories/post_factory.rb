FactoryBot.define do
  factory :post do
    sequence(:title) { |n| "Post #{n}"}
    content "Content goes here"
  end
end
