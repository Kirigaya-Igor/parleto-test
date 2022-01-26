import React from "react";
import {Form, Formik} from "formik";
import FormItem from "../common/FormItem";
import {ModalWindow} from "../ModalWindow/ModalWindow";
import * as Yup from "yup";
import {pracownicyType} from "./MainPage";

type  AddFormType = {
    isActive: boolean
    pracownicy: Array<pracownicyType>
    setPracownicy: (value: any) => void
    setIsActive: (value: boolean) => void
}

export const AddForm: React.FC<AddFormType> = ({isActive, pracownicy, setPracownicy, setIsActive}) => {

    const validationSchema = Yup.object({
        imie: Yup.string().min(2, 'Imie nie może być krótszy niż dwa symbole')
            .required('Imie jest obowiązkowe'),
        nazwisko: Yup.string().min(2, 'Nazwisko nie może być krótszy niż dwa symbole')
            .required('Nazwisko jest obowiązkowe'),
        dzial: Yup.string().min(2, 'Dział nie może być krótszy niż dwa symbole')
            .required('Dział jest obowiązkowy'),
        wynagrodzenieKwota: Yup.string().min(2, 'Wynagrodzenie nie może być krótszy niż dwa symbole')
            .required('Wynagrodzenie jest obowiązkowe'),
        wynagrodzenieWaluta: Yup.string().min(2, 'Waluta nie może być krótszy niż dwa symbole')
            .required('Waluta jest obowiązkowa')
    })

    return (
        <ModalWindow isActive={isActive}>
            <Formik
                initialValues={{imie: "", nazwisko: "", dzial: "", wynagrodzenieKwota: "", wynagrodzenieWaluta: ""}}
                validationSchema={validationSchema}
                onSubmit={(values, {resetForm} ) => {
                    setPracownicy([...pracownicy, values])
                    resetForm({})
                    setIsActive(false)
                }}
            >
                {({ isValid, dirty, errors, touched }) => (
                    <Form className='d-flex flex-column m-5 mt-3'>
                        <h6 className='text-white'><span className='textRed'>*</span> Means that the field is required !</h6>
                        <FormItem itemId='Imie' placeholder='Imie' itemType='text'
                                  itemName='imie' itemLabel='Imię' important={true} errors={errors}/>
                        <FormItem itemId='Nazwisko' placeholder='Nazwisko' itemType='text'
                                  itemName='nazwisko' itemLabel='Nazwisko' important={true} errors={errors}/>
                        <FormItem itemId='Dzial' placeholder='Dział' itemType='text'
                                  itemName='dzial' itemLabel='Dział' important={true} errors={errors}/>
                        <FormItem itemId='Wynagrodzenie' placeholder='Wynagrodzenie' itemType='text'
                                  itemName='wynagrodzenieKwota' itemLabel='Wynagrodzenie' important={true} errors={errors}/>
                        <FormItem itemId='Waluta' placeholder='Waluta' itemType='text'
                                  itemName='wynagrodzenieWaluta' itemLabel='Waluta' important={true} errors={errors}/>
                        <div className='d-flex justify-content-between'>
                            <button type="button" onClick={() => setIsActive(false)} className="btn btn-danger mt-3">Zamknij</button>
                            <button type="submit" disabled={!isValid || !dirty} className="btn btn-success mt-3">Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </ModalWindow>
    )
}