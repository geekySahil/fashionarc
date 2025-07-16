import React, { useState } from 'react'
import {Input} from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
 } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '../ui/button'

function CommonForm({formController,form, setForm, onSubmit, buttonText, isDisable}) {
    
    const inputTypes = {
        INPUT : 'input',
        SELECT: 'select',
        TEXTAREA: 'textarea',
    }


    let element; 

    const renderFormInputType = (formControllerItem) => {
        const value = form[formControllerItem.name]
      
        switch (formControllerItem.componentType) {

            case inputTypes.INPUT:
                 element = <Input 
                    type={formControllerItem.type} 
                    id={formControllerItem.name} 
                    placeholder={formControllerItem.placeholder} 
                    value={value}
                    onChange={(e) => {
                        setForm({
                            ...form , 
                            [formControllerItem.name]: e.target.value
                        })
                    }}
                    />
                break;

            case inputTypes.SELECT:
                element = <Select value={value} onValueChange={(value) => {
                    setForm({
                        ...form,
                        [formControllerItem.name]: value
                    })
                }}>
                        <SelectTrigger className="w-full text-muted-foreground">
                            <SelectValue placeholder={formControllerItem.label}/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                formControllerItem.options?.length > 0  ? (
                                    formControllerItem.options.map((optionItem) => {
                                       return <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>
                                })
                                ) : null
                            }
                        </SelectContent>
                    </Select>
                break;

            case inputTypes.TEXTAREA:
                element = <Textarea
                    id={formControllerItem.name}
                    placeholder={formControllerItem.label}
                    value={value}
                    onChange={(e) => {
                        setForm({
                            ...form, 
                            [formControllerItem.name]: e.target.value
                        })
                    }}
                    />
                break;
            default:
                element = <Input 
                    type={formControllerItem.type} 
                    id={formControllerItem.name} 
                    placeholder={formControllerItem.placeholder}
                    value={value}
                    onChange={(e) => {
                        setForm({
                            ...form , 
                            [formControllerItem.name]: e.target.value
                        })
                    }}
                    />
                break;
        }
        return element
    }



  return (
    <form onSubmit={onSubmit} className='m-auto min-w-md w-full rounded '>
        
        <div className='flex-col flex-1 text-center px-3 py-2'>
            {
                formController.map((formControllerItem) => {
                    return <div className ='pt-2 text-start ' key={formControllerItem.name}>
                        <h3 className='p-1 font-semibold'>{formControllerItem.label}</h3>
                        {renderFormInputType(formControllerItem)}
                        </div>
})
            }
            <Button disabled={isDisable} className='w-full my-5' type='submit'>{buttonText}</Button>

        </div>
        
    </form>
  )
}

export default CommonForm