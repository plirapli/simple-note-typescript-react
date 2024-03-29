import * as React from 'react';
import styles from '../assets/style/InputForm.module.css';

interface Props {
  addNote: Function;
}

const InputForm: React.FC<Props> = (props) => {
  const [newTitle, setNewTitle] = React.useState('');
  const [newBody, setNewBody] = React.useState('');

  const CharLimit = () => {
    const charLeft = 50 - newTitle.length;
    let textColor = charLeft < 10 ? 'danger' : '';

    return (
      <div className={`${styles.note_char_right} ${textColor}`}>
        Sisa karakter {charLeft}
      </div>
    );
  };

  let charLength = newTitle.length;

  const onKeyDownTitleHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    charLength = newTitle.length;

    if (e.key === 'Backspace') {
      /* 
        agar ketika judul diinput 
        via paste (tidak diketikkan) 
        tetap bisa menghapus */
      charLength = 49;
    }
  };

  const onChangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (charLength < 50) {
      setNewTitle(() => e.target.value);
    }
  };

  const onChangeBodyHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setNewBody(() => e.target.value);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let note = {
      title: newTitle,
      body: newBody,
    };

    if (charLength > 50) {
      note.title = newTitle
        .split('')
        .filter((p, i) => i < 50)
        .join('');
    }
    props.addNote(note);

    // Mereset form
    setNewTitle(() => '');
    setNewBody(() => '');
  };

  return (
    <div className={styles.note_input}>
      <h2>Buat catatan</h2>
      <CharLimit />
      <form onSubmit={onSubmitHandler} className={styles.note_form}>
        <input
          onChange={onChangeTitleHandler}
          onKeyDown={onKeyDownTitleHandler}
          type='text'
          value={newTitle}
          placeholder='Judul Catatan...'
          required
        />
        <textarea
          onChange={onChangeBodyHandler}
          value={newBody}
          placeholder='Isi catatan...'
          required></textarea>
        <button type='submit'>Buat</button>
      </form>
    </div>
  );
};

export default InputForm;
