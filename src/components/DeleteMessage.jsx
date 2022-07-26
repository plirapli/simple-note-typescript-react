import styles from '../assets/style/DeleteMessage.module.css';

const DeleteMessage = (props) => {
  const { id, title = '[Nama Judul]', body, createdAt } = props;

  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <h3>Hapus {title}</h3>
        <p>Apakah anda yakin ingin menghapus {title}?</p>
      </article>
      <div className={styles.button_container}>
        <button onClick={() => props.back(id)} className={styles.btn_back}>
          Kembali
        </button>
        <button onClick={() => props.delete(id)} className={styles.btn_danger}>
          Hapus
        </button>
      </div>
    </div>
  );
};

export default DeleteMessage;
