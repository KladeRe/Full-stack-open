import { useState, useEffect } from 'react'

import phoneService from './services/phones'

const Persons = (props) => {
    return (
        <div>
            {props.allPersons.filter(person => person.name.toUpperCase().search(props.filter.toUpperCase()) !== -1).map(person =>
                <div key={person.id}>
                    <form>
                        {person.name} {person.number}<button onClick={props.removePerson} type="submit" value={person.id}>delete</button>
                    </form>
                </div>
            )}

        </div>
    )
}

const FilterInput = (props) => {
    return (
        <div>
            <form>
                <div>
                    filter shown with<input value={props.filter} onChange={props.filterFunction}></input>

                </div>

            </form>
        </div>

    )
}

const NewPersonForm = (props) => {
    return (
        <div>
            <form onSubmit={props.addNewPerson}>
                <div>
                    name: <input value={props.Name} onChange={props.personFunction} />
                </div>
                <div>
                    number: <input value={props.Phone} onChange={props.phoneFunction} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>

        </div>
    )
}

const Notification = (props) => {
    if (props.message == null) {
        return null
    }

    return (
        <div className='message'>
            {props.message + props.name}
        </div>
    )
}

const ErrorNotification = (props) => {
    if (props.message == null) {
        return null
    }

    return (
        <div className='errorMessage'>
            <p>{props.message}</p>
        </div>
    )
}

const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')

    const [newPhone, setNewPhone] = useState('')

    const [filteredName, setFilteredName] = useState('')

    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        phoneService.getAll().then(response => {
            setPersons(response.data)
        })
    }, [])

    const addPerson = (event) => {
        event.preventDefault();
        if (persons.map(person => person.name).includes(newName)) {
            if (window.confirm(`${newName} is already added to the phonebook, replace old number with a new one?`)) {
                const id = persons.find(person => person.name == newName).id
                const newPersonObject = {
                    name: newName,
                    number: newPhone,
                    id: id
                }



                phoneService.update(id, newPersonObject).then(response => {
                    console.log(response)
                    persons[persons.indexOf(persons.find(person => person.name == newName))] = newPersonObject
                    setPersons(persons)

                    setMessage("Changed number for " + newPersonObject.name)

                    setTimeout(() => {
                        setMessage(null)
                    }, 3000)

                }).catch(error => {
                    console.log(error.message)
                    setErrorMessage("Information of " + newPersonObject.name + " has already been removed from server")
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 3000)

                })


            }
        } else {
            const personObject = {
                name: newName,
                number: newPhone,
            }
            phoneService.add(personObject).then(response => {
                setPersons(persons.concat(response.data))

            })
            setMessage("Added " + personObject.name)

            setTimeout(() => {
                setMessage(null)
            }, 3000)


        }

        setNewName('')
        setNewPhone('')
    }

    const deletePerson = (event) => {
        event.preventDefault();
        if (window.confirm(`Delete ${persons.find(person => person.id == event.target.value).name}?`)) {
            phoneService.remove(event.target.value)
            setPersons(persons.filter(person => person.id != event.target.value))

        }

    }




    const handlePersonChange = (event) => {
        setNewName(event.target.value)

    }

    const handlePhoneChange = (event) => {
        setNewPhone(event.target.value)
    }

    const handleFilteredNameChange = (event) => {
        setFilteredName(event.target.value)
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} name={newName} />
            <ErrorNotification message={errorMessage} name={newName} />
            <FilterInput filter={filteredName} filterFunction={handleFilteredNameChange} />
            <h2>add a new</h2>
            <NewPersonForm addNewPerson={addPerson} Name={newName} personFunction={handlePersonChange} Phone={newPhone} phoneFunction={handlePhoneChange} />
            <h2>Numbers</h2>
            <Persons allPersons={persons} filter={filteredName} removePerson={deletePerson} />
        </div>
    )
}

export default App