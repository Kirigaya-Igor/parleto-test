import React, {useEffect, useState} from 'react'
import './mainPage.scss'
import {AddForm} from "./AddForm";

export type pracownicyType = {
    imie: string
    nazwisko: string
    dzial: string
    wynagrodzenieKwota: string
    wynagrodzenieWaluta: string
}

export const MainPage = () => {

    const [isActive, setIsActive] = useState(false)
    const [mojeDzialy, setMojeDzialy] = useState([])
    const [dzialSalary, setDzialSalary] = useState([])
    const [minValue, setMinValue] = useState('')
    const [maxValue, setMaxValue] = useState('')
    const [searchText, setSearchText] = useState<string>('')
    const [helpList, setHelpList] = useState<Array<pracownicyType>>([])
    const [pracownicy, setPracownicy] = useState<Array<pracownicyType>>([
        {
            imie: "Jan",
            nazwisko: "Kowalski",
            dzial: "IT",
            wynagrodzenieKwota: "3000",
            wynagrodzenieWaluta: "PLN"
        },
        {
            imie: "Anna",
            nazwisko: "Bąk",
            dzial: "Administracja",
            wynagrodzenieKwota: "2400.50",
            wynagrodzenieWaluta: "PLN"
        },
        {
            imie: "Paweł",
            nazwisko: "Zabłocki",
            dzial: "IT",
            wynagrodzenieKwota: "3300",
            wynagrodzenieWaluta: "PLN"
        },
        {
            imie: "Tomasz",
            nazwisko: "Osiecki",
            dzial: "Administracja",
            wynagrodzenieKwota: "2100",
            wynagrodzenieWaluta: "PLN"
        },
        {
            imie: "Iwona",
            nazwisko: "Leihs-Gutowska",
            dzial: "Handlowiec",
            wynagrodzenieKwota: "3100",
            wynagrodzenieWaluta: "PLN"
        },
    ])

    let generalCount = 0
    pracownicy.forEach((item) => {
        // @ts-ignore
        generalCount = generalCount + +item.wynagrodzenieKwota
    })

    const searchTitle = (searchValue: string) => {
        let helpArray = pracownicy
        helpArray = helpArray.filter((item) => {
            return item.imie.toLowerCase().search(searchValue.toLowerCase()) !== -1
        })
        setHelpList(helpArray)
    }

    const addDzial = () => {
        let helpArray = [] as any
        pracownicy.forEach((pracownik) => {
            helpArray.push(pracownik.dzial)
        })
        // @ts-ignore
        helpArray = helpArray.filter(function (item, pos) {
            return helpArray.indexOf(item) === pos;
        })
        setMojeDzialy(helpArray)

        const helpObj = {}
        for (let i = 0; i < helpArray.length; ++i) {
            // @ts-ignore
            helpObj[helpArray[i]] = 0
        }

        pracownicy.forEach((item) => {
            for (let key in helpObj) {
                if (helpObj.hasOwnProperty(key)) {
                    if (item.dzial === key) {
                        // @ts-ignore
                        helpObj[key] += +item.wynagrodzenieKwota
                    }
                }
            }
        })

        let helpArr = []
        for (let key in helpObj) {
            if (helpObj.hasOwnProperty(key)) {
                // @ts-ignore
                // helpArr.push({[key]: helpObj[key]})
                helpArr.push(`${[key]}: ${helpObj[key]}`)

            }
        }

        // @ts-ignore
        setDzialSalary(helpArr)
    }

    const salaryFilter = () => {
        let helpArray = pracownicy
        if (+minValue > 0 && +maxValue > 0) {
            helpArray = helpArray.filter((item) => {
                if (+item.wynagrodzenieKwota >= +minValue && +item.wynagrodzenieKwota <= +maxValue) {
                    return item
                }
            })
            setHelpList(helpArray)
        } else if (+minValue > 0) {
            helpArray = helpArray.filter((item) => {
                if (+item.wynagrodzenieKwota >= +minValue) {
                    return item
                }
            })
            setHelpList(helpArray)
        } else if (+maxValue > 0) {
            helpArray = helpArray.filter((item) => {
                if (+item.wynagrodzenieKwota <= +maxValue) {
                    return item
                }
            })
            setHelpList(helpArray)
        } else {
            setHelpList(helpArray)
        }
    }

    const dzialFilter = (formData: any) => {
        let helpArray = pracownicy
        let helpDzialy = []
        // @ts-ignore
        let showArray = []
        for (let key in formData) {
            if (formData.hasOwnProperty(key)) {
                if (formData[key] === true) {
                    helpDzialy.push(key)
                }
            }
        }

        if (helpDzialy.length !== 0) {
            helpDzialy.forEach((dzial) => {
                helpArray.filter((item) => {
                    if (item.dzial === dzial) {
                        showArray.push(item)
                    }
                })
            })
            // @ts-ignore
            setHelpList(showArray)
        } else {
            setHelpList(pracownicy)
        }
    }

    const getCheckbox = (e: any) => {
        e.preventDefault()
        const formData = {}
        mojeDzialy.forEach((elem) => {
            // @ts-ignore
            formData[elem] = e.target[elem].checked
        })
        dzialFilter(formData)
    }

    useEffect(() => {
        setHelpList(pracownicy)
        addDzial()
    }, [pracownicy])

    useEffect(() => {
        searchTitle(searchText)
    }, [searchText])

    useEffect(() => {
        salaryFilter()
    }, [minValue, maxValue])

    return (
        <div className='mainPage'>
            <div className='container-fluid'>

                <AddForm isActive={isActive} setIsActive={setIsActive} pracownicy={pracownicy}
                         setPracownicy={setPracownicy}/>

                <div className='row mainPageContent text-white'>
                    <div className='col-12'>
                        <div className='col-12 d-md-flex justify-content-between'>
                            <div className='col-md-2 d-flex align-items-end'>
                                <input value={searchText} className='searchInput' type='text' placeholder='Search'
                                       onChange={(e) => {
                                           setSearchText(e.target.value)
                                       }}
                                />
                            </div>

                            <div className='col-md-3 d-flex align-items-end'>
                                <div>od:</div>
                                <input value={minValue} className='searchInput' type='number' placeholder='Search'
                                       onChange={(e) => {
                                           setMinValue(e.target.value)
                                       }}
                                />

                                <div>do:</div>

                                <input value={maxValue} className='searchInput' type='number' placeholder='Search'
                                       onChange={(e) => {
                                           setMaxValue(e.target.value)
                                       }}
                                />
                            </div>

                            <button type="button" onClick={() => setIsActive(true)}
                                    className="mt-2 col-md-2 btn btn-success">Dodaj nowego pracownika
                            </button>
                        </div>
                        <div className='col-12'>
                            <form onSubmit={getCheckbox} className='d-flex align-items-center'>
                                {mojeDzialy.map((dzial) => {
                                    return (
                                        <div key={dzial} style={{marginLeft: '30px'}}>
                                            <input type="checkbox" id={dzial} name={dzial} value={dzial}/>
                                            <label style={{paddingLeft: '5px'}} htmlFor={dzial}>{dzial}</label>
                                        </div>
                                    )
                                })}
                                <div>
                                    <button style={{marginLeft: '20px'}} type="submit"
                                            className="btn btn-success">Sort
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className='col-12 mt-3 d-flex justify-content-between align-items-center'>
                        <div className='col-md-3 text-center text-warning'>Imię</div>
                        <div className='col-md-3 text-center text-warning'>Nazwisko</div>
                        <div className='col-md-3 text-center text-warning'>Dział</div>
                        <div className='col-md-3 text-center text-warning'>Wynagrodzenie</div>
                    </div>

                    {helpList.map((item, index) => (
                        <div key={index + Date.now()}
                             className='col-12 d-flex justify-content-between align-items-center mainPageItem'>
                            <div className='col-md-3 text-center'>{item.imie}</div>
                            <div className='col-md-3 text-center'>{item.nazwisko}</div>
                            <div className='col-md-3 text-center'>{item.dzial}</div>
                            <div
                                className='col-md-3 text-center'>{`${item.wynagrodzenieKwota} ${item.wynagrodzenieWaluta}`}</div>
                        </div>
                    ))}

                    <div className='col-12 mainPageStatistics'>
                        <div>Suma calkowita: {generalCount}</div>
                        {dzialSalary.map((item, index) => (
                            <div key={Date.now() + index}>{item}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}