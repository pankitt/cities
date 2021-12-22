import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { ISearchData } from 'types';
import styles from './index.module.css';

interface Props {
  onSubmit: (data: ISearchData) => void;
}

const Search: FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISearchData>();

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name', { required: true })} className={styles.input} />
        <button type="submit" className={styles.submit}>
          <AiOutlineFileSearch className={styles.icon} />
        </button>
        {errors?.name && <div className={styles.message}>Field is empty</div>}
      </form>
    </div>
  );
};

export default Search;
