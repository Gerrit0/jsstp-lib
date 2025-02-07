import type base_sstp_info_t from "./base_sstp_info_t.d.ts";
import type { info_object } from "./info_object.d.ts";

/**
 * fmoメッセージクラス：単一のfmo情報クラス  
 * 単一のゴーストの全てのfmo情報を記録します。
 * @example
 * info_object {
 * 	path: 'E:\\ssp\\',
 * 	hwnd: '918820',
 * 	name: '橘花',
 * 	keroname: '斗和',
 * 	'sakura.surface': '-1',
 * 	'kero.surface': '-1',
 * 	kerohwnd: '67008',
 * 	hwndlist: '918820,67008',
 * 	ghostpath: 'E:\\ssp\\ghost\\Taromati2\\',
 * 	fullname: 'Taromati2',
 * 	modulestate: 'shiori:running'
 * }
 * @see {@link http://ssp.shillest.net/ukadoc/manual/spec_fmo_mutex.html}
 */
declare interface single_fmo_info_t extends info_object<string,string> {
	/**
	 * @description 実行中のベースソフトのルートフォルダへのフルパス
	 * @example E:\ssp\
	 */
	path: string;
	/**
	 * @description メインウィンドウのウィンドウハンドル
	 * @example 918820
	 */
	hwnd: string;
	/**
	 * @description ディスクリプタ.txtのsakura.name
	 * @example 橘花
	 */
	name: string;
	/**
	 * @description descript.txtのkero.name
	 * @example 斗和
	 */
	keroname: string;
	/**
	 * @description 現在サイドに表示されているサーフェスID
	 * @example 0
	 */
	"sakura.surface": string;
	/**
	 * @description 現在表示されているサーフェスID
	 * @example 10
	 */
	"kero.surface": string;
	/**
	 * @description サイドウィンドウのハンドル
	 * @example 67008
	 */
	kerohwnd: string;
	/**
	 * @description 現在使用されているウィンドウハンドルのカンマ区切りリスト
	 * @example 918820,67008
	 */
	hwndlist: string;
	/**
	 * @description 実行中のゴーストへのフルパス
	 * @example E:\ssp\ghost\Taromati2\
	 */
	ghostpath: string;
	/**
	 * @description 実行中のゴーストのdescript.txtの名前
	 * @example Taromati2
	 */
	fullname: string;
	/**
	 * @description 実行中のゴーストのモジュール状態
	 * @example shiori:running,makoto-ghost:running
	 */
	modulestate: string;
}
/**
 * fmoメッセージクラス：クラス定義の実装
 * @see fmo_info_t
 * @example
 * let fmo = jsstp.get_fmo_infos();
 * let kikka_uuid = fmo.get_uuid_by("name", "橘花");
 * if(kikka_uuid)
 * 	console.log(fmo[kikka_uuid].ghostpath);
 * @see {@link jsstp_t.get_fmo_infos}
 * @see {@link http://ssp.shillest.net/ukadoc/manual/spec_fmo_mutex.html}
 * @group fmo_info_t implementations
 */
declare class fmo_info_t_class_impl extends base_sstp_info_t<string,single_fmo_info_t> {
	/**
	 * 分割された文字列メッセージまたはオブジェクト・メッセージから fmo_info_t を構築する，直接の使用は推奨されない。
	 * @param {String} fmo_text
	 * @returns {void}
	 * @ignore
	 */
	/*@__PURE__*/constructor(fmo_text: String);
	/**
	 * @param {String} name チェックするプロパティの名前。
	 * @param {String} value チェックするプロパティの値。
	 * returns {String|undefined}対応するuuid(もしあれば)
	 * @description 指定された属性と属性値を持つfmoのuuidを取得します。
	 * @example
	 * let kikka_uuid = fmo_info.get_uuid_by("name", "橘花");
	 * @description `this.uuids.find(uuid => this[uuid][name] == value)` と等価です。
	 */
	/*@__PURE__*/get_uuid_by(name: String, value: String): String | undefined;
	/**
	 * @param {String} name
	 * @returns {Array<String>}
	 * @description 指定されたすべてのプロパティの値を取得する
	 * @example
	 * let ghost_list = fmo_info.get_list_of("name");
	 * @description `this.uuids.map(uuid=>this[uuid][name])`と同じ。
	 */
	/*@__PURE__*/get_list_of(name: String): Array<String>;
	/**
	 * @description すべてのuidsを取得する
	 */
	/*@__PURE__*/get uuids(): Array<String>;
	/**
	 * @description fmoが有効かどうかの判断
	 */
	/*@__PURE__*/get available(): Boolean;
	//注入toString方法便于使用
	/**
	 * 文字列メッセージの取得
	 * @returns {String} 文字列メッセージ
	 * @ignore
	 */
	/*@__PURE__*/toString(): String;
	/**
	 * `JSON.stringify` で使用するオブジェクトを取得する。
	 * @returns {Object} `JSON.stringify` で使用するオブジェクト。
	 * @ignore
	 */
	/*@__PURE__*/toJSON(): Object;
}
/**
 * 補足fmoメッセージ・クラスのデフォルト・メンバー
 * @group fmo_info_t implementations
 */
type fmo_info_t_members = {
	/**
	 * fmoメンバー
	 * @type {single_fmo_info_t|undefined}
	 */
	[uuid: string]: single_fmo_info_t|undefined;
};
/**
 * fmoメッセージ・クラス：コンストラクタ・インターフェース宣言
 * @group fmo_info_t implementations
 */
type fmo_info_t_constructor = {
	/**
	 * 分割された文字列メッセージまたはオブジェクト・メッセージから fmo_info_t を構築する，直接の使用は推奨されない。
	 * @param {String} fmo_text
	 * @returns {void}
	 * @ignore
	 */
	/*@__PURE__*/new(fmo_text: String): fmo_info_t;
};
/**
 * FMOメッセージクラス
 * @example
 * let fmo = jsstp.get_fmo_infos();
 * let kikka_uuid = fmo.get_uuid_by("name", "橘花");
 * if(kikka_uuid)
 * 	console.log(fmo[kikka_uuid].ghostpath);
 * @alias jsstp.fmo_info_t
 * @see {@link jsstp_t.get_fmo_infos}
 * @see {@link http://ssp.shillest.net/ukadoc/manual/spec_fmo_mutex.html}
 * @group fmo_info_t implementations
 */
declare const fmo_info_t: typeof fmo_info_t_class_impl & fmo_info_t_constructor;
/**
 * FMOメッセージクラス
 * @example
 * let fmo = jsstp.get_fmo_infos();
 * let kikka_uuid = fmo.get_uuid_by("name", "橘花");
 * if(kikka_uuid)
 * 	console.log(fmo[kikka_uuid].ghostpath);
 * @alias jsstp.fmo_info_t
 * @see {@link jsstp_t.get_fmo_infos}
 * @see {@link http://ssp.shillest.net/ukadoc/manual/spec_fmo_mutex.html}
 * @group fmo_info_t implementations
 */
type fmo_info_t = fmo_info_t_class_impl & fmo_info_t_members & {
	constructor: typeof fmo_info_t;
}

export {
	single_fmo_info_t,
	fmo_info_t,
	fmo_info_t as default,
};
