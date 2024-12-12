import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { BellAlertIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Veículos', href: '/'},
  { name: 'Motoristas', href: '/motoristas'},
  { name: 'Viagens', href: '/viagens' }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const location = useLocation();

  return (
    <Disclosure as="nav" className="p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://media.licdn.com/dms/image/v2/C4E0BAQFX20GP9bryWw/company-logo_200_200/company-logo_200_200/0/1630579598280/motora_technologies_logo?e=1741824000&v=beta&t=fTETjUTy0He0m9JcaUeBFDKJvis4JqiqcgwC0bWmIIg"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={location.pathname === item.href ? 'page' : undefined}
                    className={classNames(
                      location.pathname === item.href ? 'bg-motoraDarkBlue text-white' : 'text-motoraDarkBlue hover:bg-motoraLightBlue hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
              type="button">
                <BellAlertIcon className="h-6 w-6 text-motoraDarkBlue" />
            </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}
