import React, { useState } from 'react';

const EventForm = ({ state, dispatch }) => {
  console.log(state, 'in EventForm.js');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addEvent = e => {
    // 画面全体のリロードが無くなる
    e.preventDefault();
    console.log({ title, body });
    dispatch({
      type: 'CREATE_EVENT',
      title,
      body
    });

    setTitle('');
    setBody('');
  };

  console.log({ state });

  const deleteAllEvents = e => {
    e.preventDefault();
    const result = window.confirm('全てのイベントを本当に削除しても良いですか？');
    if (result) {
      dispatch({ type: 'DELETE_ALL_EVENTS' });
    }
  };

  const unCreatable = title === '' || body === '';

  return (
    <React.Fragment>
      <h4>イベント作成フォーム</h4>
      <form>
        <div className="form-group">
          <label htmlFor="formEventTitle">タイトル</label>
          <input
            className="form-control"
            id="formEventTitle"
            value={title}
            onChange={e => setTitle(e.target.value)}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="formEventBody">ボディー</label>
          <textarea
            className="form-control"
            id="formEventBody"
            value={body}
            onChange={e => setBody(e.target.value)}
          ></textarea>
        </div>

        <button className="btn btn-primary" onClick={addEvent} disabled={unCreatable}>
          イベントを作成する
        </button>
        <button className="btn btn-danger" onClick={deleteAllEvents} disabled={state.length === 0}>
          全てのイベントを削除する
        </button>
      </form>
    </React.Fragment>
  );
};

export default EventForm;