require 'test_helper'

class MachineControllerTest < ActionDispatch::IntegrationTest
  test "should get machine" do
    get machine_machine_url
    assert_response :success
  end

end
