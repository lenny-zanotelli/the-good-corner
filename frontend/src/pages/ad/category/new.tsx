/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import styles from '@/styles/NewAd.module.css';
import { useRouter } from 'next/router';

function NewCategory() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post('http://localhost:4000/category', data);
          toast.success('New Category has been submit!');
          setTimeout(() => {
            router.push('/');
          }, 1000);
          console.log(data);
        } catch (error) {
          toast.error('Cant add new Category');
          console.log(error);
        }
      })}
    >
      <label>
        Nom de la Categorie :
        {' '}
        <br />
        <input
          {...register('name', { required: true })}
          className={styles.textField}
        />
        {errors.name && toast.warning('Name is required')}
      </label>
      <br />
      <button
        className="button"
        type="submit"
      >
        Submit
      </button>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </form>
  );
}

export default NewCategory;