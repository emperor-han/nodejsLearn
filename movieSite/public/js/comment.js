$(function() {
  $('.commentUser').click((e) => {
    var target = $(e.target);
    var commentId = target.data('cid');
    var toId = target.data('toid');
    if (!document.querySelector("#commentId")) {
      $('<input>').attr({
        type: 'hidden',
        name: 'commentId',
        value: commentId,
        id: 'commentId'
      }).appendTo($('#commentForm'));
    }else{
      $('#commentId').val(commentId);
    }

    if (!document.querySelector("#toid")) {
      $('<input>').attr({
        type: 'hidden',
        name: 'rely[to]',
        value: toId,
        id: 'toid'
      }).appendTo($('#commentForm'));
    }else{
      $('#toid').val(toId);
    }
  })
})
