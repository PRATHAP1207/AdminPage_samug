//import '../fake-db'
import React from 'react'
import { Store } from './redux/Store'
import { Provider } from 'react-redux'
import { AllPages } from './routes/routes'
import { MatxTheme } from 'app/components'
import { useRoutes } from 'react-router-dom'
import { AuthProvider } from 'app/contexts/JWTAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { IntlProvider } from 'react-intl'
import AppLocale from 'app/lngProvider'
//import { history } from './redux/Store'
const App = () => {
    const all_pages = useRoutes(AllPages())
    let locale = {
        languageId: 'english',
        locale: 'en',
        name: 'English',
        icon: 'us',
    }
    const currentAppLocale = AppLocale[locale.locale]
    return (
        <Provider store={Store}>
            <SettingsProvider>
                <MatxTheme>
                    <IntlProvider
                        locale={currentAppLocale.locale}
                        messages={currentAppLocale.messages}
                    >
                        <AuthProvider>{all_pages}</AuthProvider>
                    </IntlProvider>
                </MatxTheme>

                {/* <div>{this.props.children}</div> */}
            </SettingsProvider>
        </Provider>
    )
}

export default App
