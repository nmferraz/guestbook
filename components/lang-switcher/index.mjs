import React from 'react';
import Link from 'next/link';
import { getLangs } from '../../locales';
import  meta from '../../locales/meta';
import {useRouter} from "next/router";
function LangSwitcher (props) {
    const { locale, locales, defaultLocale } = useRouter();
    const langs = getLangs(locale, locales, defaultLocale);
    const redirectPath = props.redirectTo || '';
    const {
        children,
        ...other
    } = props;
    return <>
        {langs.map((lang, i) => (
            <Link key={i} href={`/${lang}/${redirectPath}`} locale={lang}>
                <a>{meta[lang].label} </a>
            </Link>
        ))}
    </>
}
export default LangSwitcher;