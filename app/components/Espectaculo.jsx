"use client"; // This is a client component 👈🏽

import { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';

export default function Espectaculo() {
    const [coverPhotoPreview, setCoverPhotoPreview] = useState();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { register, control, handleSubmit, formState: { errors }, setValue, getValues, watch } = useForm({
        defaultValues: {
            dates: [{ startDate: new Date() }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "dates"
    });
    const { dates } = getValues();
    const coverPhotoFile = watch('coverPhoto');
      
    const onSubmit = (data) => {
        // Split the 'plays' string by commas, trim whitespace, and remove any empty strings
        const playsArray = data.plays
            .split(',')
            .map(play => play.trim())
            .filter(play => play !== ''); // Exclude empty strings

        const formData = {
            ...data,
            plays: playsArray
        };
        console.log(formData);
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 5000); // Message will disappear after 5 seconds
    };

    // Clean up function to revoke URL on unmount
    useEffect(() => {
        return () => {
            if (coverPhotoPreview) {
                URL.revokeObjectURL(coverPhotoPreview);
            }
        };
    }, [coverPhotoPreview]);
  
    // Effect for cover photo preview
    useEffect(() => {
        if (coverPhotoFile && coverPhotoFile.length > 0) {
          const file = coverPhotoFile[0];
          const fileUrl = URL.createObjectURL(file);
          setCoverPhotoPreview(fileUrl);
          // Clean up function to revoke URL
          return () => {
            URL.revokeObjectURL(fileUrl);
          };
        }
      }, [coverPhotoFile]);

    useEffect(() => {
        register('dates');
    }, [register]);
    
      // File validation function
      const validateFile = (fileList) => {
        if (fileList.length === 0) return true; // No file selected is not a validation error
        const file = fileList[0];
        const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
        const isValidType = validTypes.includes(file.type);
        const isLessThan2MB = file.size < 2 * 1024 * 1024; // Less than 2MB
        return isValidType && isLessThan2MB;
      };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="m-auto bg-white p-10 rounded shadow-lg w-full max-w-4xl !my-4">
        <h2 className="text-2xl font-bold text-[#211f1f] text-center my-4">Crear Espectáculo</h2>
        {formSubmitted && (
          <p className="text-green-500 text-center">Compañía agregada correctamente. Por favor visita la consola para ver la información cargada.</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-10">
            {/* ... other form fields ... */}

            {Object.keys(errors).length > 0 && (
                <div className="md:col-span-2">
                    <p className="text-red-500 text-center">Por favor, completa todos los campos requeridos.</p>
                </div>
            )}
        <div className="grid grid-cols-3 gap-4">
            <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">País</label>
                <input {...register('country', { required: true })} placeholder="Argentina" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
                <label htmlFor="theater" className="block text-sm font-medium text-gray-700">Teatro, auditorio o lugar</label>
                <input {...register('theater', { required: true })} placeholder="Teatro Colón" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Compañía</label>
                <input {...register('company', { required: true })} placeholder="Teatro Colón" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
                <input {...register('title', { required: true })} placeholder="Lorem ipsum" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
                <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">Subtítulo</label>
                <input {...register('subtitle')} placeholder="dolor sit amet" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
                <label htmlFor="style" className="block text-sm font-medium text-gray-700">Estilos</label>
                <input {...register('style')} placeholder="Ballet clásico" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="briefDescription" className="block text-sm font-medium text-gray-700">Descripción breve</label>
                <textarea {...register('briefDescription')} placeholder="Lorem ipsum dolor sit amet..." className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
                <div>
                    <label htmlFor="liveStreamLink" className="block text-sm font-medium text-gray-700">Link para tickets</label>
                    <input {...register('liveStreamLink')} placeholder="https://youtube.com" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div className='mt-1'>
                    
                    <label htmlFor="ticketLink" className="block text-sm font-medium text-gray-700">Link para tickets</label>
                    <input {...register('ticketLink')} placeholder="https://ticketek.com.ar" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div className='mt-1 flex flex-wrap gap-2'>
                    <div className="flex gap-2">
                        <input type="checkbox" {...register('freeEvent')} />
                        <label htmlFor="freeEvent" className="text-sm font-medium text-gray-700">Evento gratuito</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" {...register('freeTransmission')} />
                        <label htmlFor="freeTransmission" className="text-sm font-medium text-gray-700">Transmisión gratuita</label>
                    </div>
                </div>
            </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
            <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duración</label>
                <input {...register('duration', { required: true })} type="number" placeholder="120" min="1" className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                <span> minutos</span>
            </div>
            <div className='mt-1'>
                <label htmlFor="intervals" className="block text-sm font-medium text-gray-700">Intervalos</label>
                <input {...register('intervals', { required: true })} type="number" placeholder="1" className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" min="1" max="3" />
            </div>
        </div>
        <div className='grid grid-cols-1 gap-4'>
            <div>
                <label htmlFor="plays" className="block text-sm font-medium text-gray-700">Obras (separadas por comas)</label>
                <input {...register('plays')} placeholder="Hamlet, Romeo & Julieta, etc." className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
        </div>
        <div className='grid grid-cols-1 gap-4'>
            <label className="block text-sm font-medium text-gray-700">Fechas</label>
                    {fields.map((item, index) => (
                          <div key={item.id} className='flex gap-2 items-center'>
                              <Controller
                                  control={control}
                                  name={`dates.${index}.startDate`}
                                  render={({ field }) => (
                                      <DatePicker
                                          {...field}
                                          selected={field.value}
                                          onChange={(date) => field.onChange(date)}
                                          showTimeSelect
                                          timeFormat="HH:mm"
                                          timeIntervals={15}
                                          timeCaption="time"
                                          dateFormat="MMMM d, yyyy h:mm aa"
                                          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                      />
                                  )}
                              />
                              <button
                                  type="button"
                                  onClick={() => fields.length > 1 && remove(index)}
                                  className={`px-3 py-1 border rounded ${fields.length <= 1 ? 'cursor-not-allowed opacity-50' : 'bg-red-500 text-white hover:bg-red-700'}`}
                                  disabled={fields.length <= 1}
                              >
                                  Remover
                              </button>
                          </div>
                      ))}
                    {fields.length < 10 && (
                        <button 
                            type="button" 
                            onClick={() => append({ startDate: new Date() }, { shouldFocus: false })} 
                            className="px-3 py-1 w-2/5 mx-auto border rounded bg-green-500 border-green-500 text-white hover:bg-green-700 hover:border-green-700"
                        >
                            Agregar nueva Fecha
                        </button>
                    )}
        </div>
        {/* Foto de portada */}
        <div>
            <label htmlFor="coverPhoto" className="block text-sm font-medium text-gray-700">Foto de portada</label>
            <input
                {...register('coverPhoto', { validate: validateFile })}
                id="coverPhoto"
                type="file"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                accept="image/png, image/jpeg, image/webp"
                />
                {errors.coverPhoto && <p className="text-red-500 text-xs italic">Please upload a valid PNG, JPG, or WEBP less than 2MB.</p>}
                {coverPhotoPreview && <img src={coverPhotoPreview} alt="Cover photo preview" className="mt-2 h-40 w-full object-cover" />}
        </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full mb-4 px-4 py-2 text-white bg-black rounded-md hover:bg-opacity-90 focus:outline-none focus:shadow-outline">CREAR</button>
          </div>
        </form>
        <Link href="../home" className='text-center'>
            <div>Volver al inicio</div>
        </Link>
      </div>
    </div>
  );
}