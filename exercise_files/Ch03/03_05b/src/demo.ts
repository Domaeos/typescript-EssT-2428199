////////////////////

type ContactStatus = "active" | "inactive" | "new";

interface Address {
    street: string;
    province: string;
    postalCode: string;
}

interface Contact {
    id: number;
    name: string;
    status: ContactStatus;
    address: Address;
    email: string;
}

interface Query {
    sort?: 'asc' | 'desc';
    matches(val): boolean;
}

// Below allows any partial properties of a record with key of contact and a query, but omits address and status
// type ContactQuery =
//     Omit<
//         Partial<
//             Record<
//                 keyof Contact, Query
//             >
//         >,
//         "address" | "status"   // ommit address property from valid contactquery type
//     >

// Below means Pick only from id and name as valid query no matter what gets added, ie email above
// type ContactQuery =
//     Partial<
//         Pick<
//             Record<keyof Contact, Query>,
//             "id" | "name"
//         >
//     >

// type RequiredContactQuery = Required<ContactQuery>;

function searchContacts(contacts: Contact[], query: ContactQuery) {
    return contacts.filter(contact => {
        for (const property of Object.keys(contact) as (keyof Contact)[]) {
            // get the query object for this property
            const propertyQuery = query[property];
            // check to see if it matches
            if (propertyQuery && propertyQuery.matches(contact[property])) {
                return true;
            }
        }

        return false;
    })
}

const filteredContacts = searchContacts(
    [/* contacts */],
    {
        id: { matches: (id) => id === 123 },
        name: { matches: (name) => name === "Carol Weaver" }
    }
);