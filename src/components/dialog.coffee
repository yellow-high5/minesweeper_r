messages = $('#messages')
App.dialog = App.cable.subscriptions.create { channel: "DialogChannel", dialog_id: messages.data('dialog_id') },
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->

    $('#chat_history').load("http://localhost:3000/chat" + ' #chat_history')
    #メッセージのユーザーIDが現在のユーザーIDと一致する場合
    if data['user_id'] == $('.current_user_id').val()
      $('#messages').append data['message_self']
      $('#mCSB_5_container').animate {top: -($('#mCSB_5')[0].scrollHeight - 480)}, 'fast' #スクロール最下部へ
      $('#mCSB_5_dragger_vertical').animate {top: 480-('#mCSB_5_dragger_vertical')[0].scrollHeight}, 'fast' # スクロールバー最下部へ
    #一致しない場合
    else
      $('#messages').append data['message_other']
      $('#mCSB_5_container').animate {top: -($('#mCSB_5')[0].scrollHeight - 480)}, 'fast' #スクロール最下部へ
      $('#mCSB_5_dragger_vertical').animate {top: 480-$('#mCSB_5_dragger_vertical')[0].scrollHeight}, 'fast' #スクロールバー最下部へ

  speak: (message) ->
    @perform 'speak', message: message

$(document).on 'keypress', '[data-behavior~=dialog_speaker]', (event) ->
  if event.keyCode is 13  # return = send
    App.dialog.speak event.target.value
    event.target.value = ''
    event.preventDefault()

$(document).on 'click', '#sent', ->
  @message = $('.form-control[data-behavior~=dialog_speaker]').val()
  App.dialog.speak @message
  $('.form-control[data-behavior~=dialog_speaker]').val('')
  event.preventDefault()
