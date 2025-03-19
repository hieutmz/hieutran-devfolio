import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "../services/locale";

export default getRequestConfig(async () => {
	const locale = await getUserLocale();

	const common = await import(`./locales/${locale}/common.json`);
	const component = await import(`./locales/${locale}/component.json`);
	const newCampaign = await import(`./locales/${locale}/new-campaign.json`);
	const campaign = await import(`./locales/${locale}/campaign.json`);
	const list = await import(`./locales/${locale}/list.json`);
	const lead = await import(`./locales/${locale}/lead.json`);
	const manual = await import(`./locales/${locale}/manual.json`);
	const report = await import(`./locales/${locale}/report.json`);
	const editCampaign = await import(`./locales/${locale}/edit-campaign.json`);

	return {
		locale,
		messages: {
			...common,
			...component,
			...newCampaign,
			...campaign,
			...list,
			...lead,
			...manual,
			...report,
			...editCampaign,
		},
	};
});
