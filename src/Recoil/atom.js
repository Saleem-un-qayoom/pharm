import { atom } from 'recoil';

export const pinCodeData = atom({
	key: 'pinCodeData',
	default: localStorage.getItem('pharm-box-pin-code')
		? JSON.parse(localStorage.getItem('pharm-box-pin-code'))
		: '',
});

export const userData = atom({
	key: 'userData',
	default: localStorage.getItem('pharm-box-user')
		? JSON.parse(localStorage.getItem('pharm-box-user'))
		: '',
});

export const storeData = atom({
	key: 'storeData',
	default: localStorage.getItem('pharm-box-store')
		? JSON.parse(localStorage.getItem('pharm-box-store'))
		: '',
});

export const bannersAtom = atom({
	key: 'bannersAtom',
	default: [],
});

export const ProductListData = atom({
	key: 'ProductListData',
	default: [],
});

export const catListAtom = atom({
	key: 'catListAtom',
	default: [],
});

export const brandAtom = atom({
	key: 'brandAtom',
	default: [],
});

export const medicineAtom = atom({
	key: 'medicineAtom',
	default: [],
});

export const mainDataAtom = atom({
	key: 'mainDataAtom',
	default: [],
});

export const aboutAtom = atom({
	key: 'aboutAtom',
	default: [],
});

export const contactAtom = atom({
	key: 'contactAtom',
	default: [],
});

export const tncAtom = atom({
	key: 'tncAtom',
	default: [],
});

export const homeDataAtom = atom({
	key: 'homeDataAtom',
	default: [],
});

// Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, iusto?
// Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, iusto?
// Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, iusto?
// Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, iusto?
// Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, iusto?
// Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, iusto?
// Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, iusto?

export const PrivacyPolicyData = atom({
	key: 'PrivacyPolicyData',
	default: [],
});

export const AboutData = atom({
	key: 'AboutData',
	default: [],
});

export const ContactData = atom({
	key: 'ContactData',
	default: [],
});

export const FeedbackData = atom({
	key: 'FeedbackData',
	default: [],
});

export const TermsAndConditionData = atom({
	key: 'TermsAndConditionData',
	default: [],
});

export const exploreSomethingData = atom({
	key: 'exploreSomethingData',
	default: [],
});

export const categoryListData = atom({
	key: 'categoryListData',
	default: [],
});