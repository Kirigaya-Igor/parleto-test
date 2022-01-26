import React from 'react';
import {ErrorMessage, Field} from 'formik';
import TextError from './TextError';
import './textError.scss'

type FormItemPropsType = {
    itemId: string
    placeholder: string
    itemType: string
    itemName: string
    itemLabel: string
    important: boolean
    errors: any
}

const FormItem: React.FC<FormItemPropsType> = ({itemId, placeholder, itemType, itemName, itemLabel, important, errors}) => {
    return (
        <div className="mb-1">
            <label htmlFor={itemId} className="form-label text-white d-flex justify-content-start">
                {itemLabel} {important ? <span className='error'>*</span> : ''}
            </label>
            <ErrorMessage name={itemName} component={TextError}/>
            <Field className='form-control' id={itemId} placeholder={placeholder} type={itemType} name={itemName}/>

        </div>
    )
}

export default FormItem