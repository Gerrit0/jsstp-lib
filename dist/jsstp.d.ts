/**
 * 拓展object，提供一些简单且遍历的操作
 */
declare class info_object {
	/**
	 * @description 获取所有key的数组
	 */
	/*@__PURE__*/get keys(): PropertyKey[];
	/**
	 * @description 获取所有value的数组
	 */
	/*@__PURE__*/get values(): any[];
	/**
	 * @description 获取所有key-value对的数组
	 */
	/*@__PURE__*/get entries(): [PropertyKey, any][];
	/**
	 * @description 获取成员数量
	 */
	/*@__PURE__*/get length(): number;
	/**
	 * @description 对每个key-value对执行某个函数
	 * @param {(value,key?)} func 要执行的函数，若返回值不为undefined，则会替换原value
	 */
	/*@__PURE__*/forEach(func: (value: any, key?: PropertyKey) => any|undefined): void;
	/**
	 * @description 复制一个新的对象
	 * @returns {info_object} 复制的对象
	 */
	/*@__PURE__*/get trivial_clone(): info_object;
	/**
	 * @description 遍历自身和子对象并返回一个由遍历结果构成的一维数组
	 * @param {(dimensions[...],value):any} func 要执行的函数，返回值将被添加到数组中
	 */
	/*@__PURE__*/flat_map<T>(func: (...dimensions_with_value_in_last: [...PropertyKey[],any]) => T): T[];
	/**
	 * @description 遍历自身并返回一个由遍历结果构成的一维数组
	 * @param {(value,key?):any} func 要执行的函数，返回值将被添加到数组中
	 */
	/*@__PURE__*/map<T>(func: (value: any, key?: PropertyKey) => T): T[];
	/**
	 * @description 对自身按照数组追加元素
	 * @param {[undefined|[PropertyKey,any]]} array 要追加的数组
	 */
	/*@__PURE__*/push(array: [undefined|[PropertyKey, any]]): void;
}

/*
sstp报文格式：
SEND SSTP/1.1
Charset: UTF-8
Sender: SSTPクライアント
Script: \h\s0テストー。\u\s[10]テストやな。
Option: notranslate
由一行固定的报文头和一组可选的报文体组成，以\r\n换行，结尾以\r\n\r\n结束。
*/
/**
 * 基础sstp报文类
 * @example
 * let info = jsstp.base_sstp_info_t.from_string("SSTP/1.4 200 OK\r\nCharset: UTF-8\r\nSender: SSTPクライアント\r\nScript: \\h\\s0テストー。\\u\\s[10]テストやな。\r\nOption: notranslate\r\n\r\n");
 * console.log(info.head);//SSTP/1.4 200 OK
 * console.log(info.Option);//notranslate
 * @alias jsstp.base_sstp_info_t
 */
declare class base_sstp_info_t extends info_object {
	/**
	 * 自拆分好的字符串报文或对象报文构造sstp_info_t，不建议直接使用
	 * @param {String} info_head 报文头
	 * @param {Object} info_body 对象格式的报文体
	 * @param {Array<String>|undefined} unknown_lines 未知行的数组
	 * @see {@link sstp_info_t.from_string}
	 * @ignore
	 */
	/*@__PURE__*/constructor(info_head: String, info_body: Object, unknown_lines?: String[]);
	/**
	 * 获取未知行的数组
	 * @returns {Array<String>} 未知行的数组
	 */
	/*@__PURE__*/get unknown_lines(): Array<String>;
	/**
	 * 获取报文头
	 * @returns {String} 报文头
	 */
	/*@__PURE__*/get head(): String;
	//注入toString方法便于使用
	/**
	 * 获取字符串报文
	 * @returns {String} 字符串报文
	 * @ignore
	 */
	/*@__PURE__*/toString(): String;
	/**
	 * 获取字符串报文
	 * @returns {String} 字符串报文
	 */
	/*@__PURE__*/to_string(): String;
	/**
	 * 获取用于`JSON.stringify`的对象
	 * @returns {Object} 用于`JSON.stringify`的对象
	 * @ignore
	 */
	/*@__PURE__*/toJSON(): Object;
	/**
	 * 获取报头返回码（若出现意外返回`NaN`）
	 * @returns {Number} 报头返回码（若出现意外则为`NaN`）
	 */
	/*@__PURE__*/get status_code(): Number;
	/**
	 * 其他报文成员
	 * @type {any|undefined}
	 */
	[key: string]: any|undefined;
}

//定义sstp报文类
/*
sstp报文格式：
SEND SSTP/1.1
Charset: UTF-8
Sender: SSTPクライアント
Script: \h\s0テストー。\u\s[10]テストやな。
Option: notranslate
由一行固定的报文头和一组可选的报文体组成，以\r\n换行，结尾以\r\n\r\n结束。
*/
/**
 * sstp报文类
 * @example
 * let info = jsstp.sstp_info_t.from_string("SSTP/1.4 200 OK\r\nCharset: UTF-8\r\nSender: SSTPクライアント\r\nScript: \\h\\s0テストー。\\u\\s[10]テストやな。\r\nOption: notranslate\r\n\r\n");
 * console.log(info.head);//SSTP/1.4 200 OK
 * console.log(info.Option);//notranslate
 * @alias jsstp.sstp_info_t
 */
declare class sstp_info_t extends base_sstp_info_t {
	/**
	 * 自拆分好的字符串报文或对象报文构造sstp_info_t，不建议直接使用
	 * @param {String} info_head 报文头
	 * @param {Object} info_body 对象格式的报文体
	 * @param {Array<String>|undefined} unknown_lines 未知行的数组
	 * @see {@link sstp_info_t.from_string}
	 * @returns {sstp_info_t}
	 * @ignore
	 */
	/*@__PURE__*/constructor(info_head: String, info_body: Object, unknown_lines?: String[]);
	/**
	 * 从字符串构造sstp_info_t
	 * @param {String} str 字符串报文
	 * @returns {sstp_info_t} 构造的sstp_info_t
	 * @example
	 * let info = sstp_info_t.from_string("SSTP/1.4 200 OK\r\nCharset: UTF-8\r\nSender: SSTPクライアント\r\nScript: \\h\\s0テストー。\\u\\s[10]テストやな。\r\nOption: notranslate\r\n\r\n");
	 */
	/*@__PURE__*/static from_string(str: String): sstp_info_t;
	/**
	 * 获取PassThru的值
	 * @param {String} key 获取的PassThru名称
	 * @returns {String|undefined} PassThru的值
	 */
	/*@__PURE__*/get_passthrough(key: String): String | undefined;
	/**
	 * 获取所有的PassThru
	 * @returns {info_object} 所有的PassThru
	 */
	/*@__PURE__*/get passthroughs(): info_object;
	/**
	 * 获取原始对象
	 * @returns {sstp_info_t} 原始对象
	 */
	/*@__PURE__*/get raw(): sstp_info_t;

	//base_sstp_info_t的成员

	/**
	 * @description 获取所有key的数组
	 */
	/*@__PURE__*/get keys(): string[];
	/**
	 * @description 获取所有value的数组
	 */
	/*@__PURE__*/get values(): String[];
	/**
	 * @description 获取所有key-value对的数组
	 */
	/*@__PURE__*/get entries(): [string, String][];
	/**
	 * @description 对每个key-value对执行某个函数
	 * @param {(value,key?)} func 要执行的函数，若返回值不为undefined，则会替换原value
	 */
	/*@__PURE__*/forEach(func: (value: String, key?: string) => String|undefined): void;
	/**
	 * @description 遍历自身和子对象并返回一个由遍历结果构成的一维数组
	 * @param {(dimensions[...],value):any} func 要执行的函数，返回值将被添加到数组中
	 */
	/*@__PURE__*/flat_map<T>(func: (...dimensions_with_value_in_last: [...string[],String]) => T): T[];
	/**
	 * @description 遍历自身并返回一个由遍历结果构成的一维数组
	 * @param {(value,key?):any} func 要执行的函数，返回值将被添加到数组中
	 */
	/*@__PURE__*/map<T>(func: (value: String, key?: string) => T): T[];
	/**
	 * @description 对自身按照数组追加元素
	 * @param {[undefined|[String,any]]} array 要追加的数组
	 */
	/*@__PURE__*/push(array: [undefined|[string, String]]): void;

	/**
	 * 其他报文成员
	 * @type {String|undefined}
	 */
	[key: string]: String | undefined;
}

/**
 * fmo报文类
 * @example
 * let fmo = jsstp.get_fmo_infos();
 * let kikka_uuid = fmo.get_uuid_by("name", "橘花");
 * if(kikka_uuid)
 * 	console.log(fmo[kikka_uuid].ghostpath);
 * @alias jsstp.fmo_info_t
 * @see {@link jsstp_t.get_fmo_infos}
 * @see {@link http://ssp.shillest.net/ukadoc/manual/spec_fmo_mutex.html}
 */
declare class fmo_info_t extends base_sstp_info_t {
	/**
	 * 自字符串构造fmo_info_t，不建议直接使用
	 * @param {String} fmo_text
	 * @returns {void}
	 * @ignore
	 */
	/*@__PURE__*/constructor(fmo_text: String);
	/**
	 * @param {String} name 要检查的属性名
	 * @param {String} value 期望的属性值
	 * @returns {String|undefined} 对应的uuid（如果有的话）
	 * @description 获取具有指定属性且属性值为指定值的fmo的uuid
	 * @example 
	 * let kikka_uuid = fmo_info.get_uuid_by("name", "橘花");
	 * @description 等价于`this.uuids.find(uuid => this[uuid][name] == value)`
	 */
	/*@__PURE__*/get_uuid_by(name: String, value: String): String | undefined;
	/**
	 * @param {String} name
	 * @returns {Array<String>}
	 * @description 获取所有指定属性的值
	 * @example
	 * let ghost_list = fmo_info.get_list_of("name");
	 * @description 等价于`this.uuids.map(uuid => this[uuid][name])`
	 */
	/*@__PURE__*/get_list_of(name: String): Array<String>;
	/**
	 * @description 获取所有uuid
	 */
	/*@__PURE__*/get uuids(): Array<String>;
	/**
	 * @description 判断fmo是否有效
	 */
	/*@__PURE__*/get available(): Boolean;
	//注入toString方法便于使用
	/**
	 * 获取字符串报文
	 * @returns {String} 字符串报文
	 * @ignore
	 */
	/*@__PURE__*/toString(): String;
	/**
	 * 获取用于`JSON.stringify`的对象
	 * @returns {Object} 用于`JSON.stringify`的对象
	 * @ignore
	 */
	/*@__PURE__*/toJSON(): Object;

	//base_sstp_info_t的成员

	/**
	 * @description 获取所有key的数组
	 */
	/*@__PURE__*/get keys(): string[];
	/**
	 * @description 获取所有value的数组
	 */
	/*@__PURE__*/get values(): base_sstp_info_t[];
	/**
	 * @description 获取所有key-value对的数组
	 */
	/*@__PURE__*/get entries(): [string, base_sstp_info_t][];
	/**
	 * @description 对每个key-value对执行某个函数
	 * @param {(value,key?)} func 要执行的函数，若返回值不为undefined，则会替换原value
	 */
	/*@__PURE__*/forEach(func: (value: base_sstp_info_t, key?: string) => base_sstp_info_t|undefined): void;
	/**
	 * @description 遍历自身和子对象并返回一个由遍历结果构成的一维数组
	 * @param {(dimensions[...],value):any} func 要执行的函数，返回值将被添加到数组中
	 */
	/*@__PURE__*/flat_map<T>(func: (...dimensions_with_value_in_last: [...string[],base_sstp_info_t]) => T): T[];
	/**
	 * @description 遍历自身并返回一个由遍历结果构成的一维数组
	 * @param {(value,key?):any} func 要执行的函数，返回值将被添加到数组中
	 */
	/*@__PURE__*/map<T>(func: (value: base_sstp_info_t, key?: string) => T): T[];
	/**
	 * @description 对自身按照数组追加元素
	 * @param {[undefined|[String,any]]} array 要追加的数组
	 */
	/*@__PURE__*/push(array: [undefined|[string, base_sstp_info_t]]): void;

	/**
	 * fmo成员
	 * @type {base_sstp_info_t|undefined}
	 */
	[uuid: string]: base_sstp_info_t|undefined;
}

/**
 * sstp方法调用器
 */
interface method_caller{
	(info: Object): Promise<sstp_info_t>,
	get_raw(info: Object): Promise<String>
}

/**
 * 事件调用器
 */
interface base_event_caller{
	[key: string]: base_event_caller,//扩展事件名称
}
/**
 * 简易事件调用器
 * 直接调用以触发事件！
 * @example
 * let data=await jsstp.OnTest(123,"abc");
 * //等价于
 * let data = await jsstp.SEND({
 * 	"Event": "OnTest",
 * 	"Reference0": 123,
 * 	"Reference1": "abc"
 * });
 */
interface simple_event_caller extends base_event_caller {
	(...args: any[]): Promise<sstp_info_t>,
	[key: string]: simple_event_caller,//扩展事件名称
}
/**
 * 通用事件调用器
 * 调用时传入一个对象以触发事件！
 * @example
 * let caller=jsstp.get_caller_of_event("OnTest");
 * //...
 * let data=await caller({
 * 	"Reference0": 123,
 * 	"Reference1": "abc"
 * });
 * //等价于
 * let data = await jsstp.SEND({
 * 	"Event": "OnTest",
 * 	"Reference0": 123,
 * 	"Reference1": "abc"
 * });
 */
interface common_event_caller extends base_event_caller{
	(info: Object): Promise<sstp_info_t>,
	[key: string]: common_event_caller,//扩展事件名称
}

//定义一个包装器
/**
 * jsstp对象
 * @see {@link jsstp}
 * @alias jsstp.type
 * @example
 * let my_jsstp=new jsstp.type("my_coooool_jsstp",sstp_server_url);
 */
declare class jsstp_t{
	/**
	 * @group Types
	 */
	type: typeof jsstp_t;
	/**
	 * @group Types
	 */
	base_sstp_info_t: typeof base_sstp_info_t;
	/**
	 * @group Types
	 */
	sstp_info_t: typeof sstp_info_t;
	/**
	 * @group Types
	 */
	fmo_info_t: typeof fmo_info_t;
	/**
	 * @group Types
	 */
	ghost_events_queryer_t: typeof ghost_events_queryer_t;

	/**
	 * @group SSTP Base Methods
	*/
	SEND: method_caller;
	/**
	 * @group SSTP Base Methods
	*/
	NOTIFY: method_caller;
	/**
	 * @group SSTP Base Methods
	*/
	COMMUNICATE: method_caller;
	/**
	 * @group SSTP Base Methods
	*/
	EXECUTE: method_caller;
	/**
	 * @group SSTP Base Methods
	*/
	GIVE: method_caller;

	/**
	 * 匹配事件名称以产生简易调用器
	 * @group jsstp_event_members
	 * @example
	 * let data=await jsstp.OnTest(123,"abc");
	 */
	[key: `On${string}`]: simple_event_caller;

	/**
	 * 在fecth时使用的header
	 */
	RequestHeader: {
		[key: string]: string,
	};
	/**
	 * 默认的报文内容
	 */
	default_info: {
		[key: string]: string,
	};

	/**
	 * SSTP协议版本号列表
	 */
	sstp_version_table: {
		[method: string]: Number
	};
	/**
	 * 查询默认的安全等级，在nodejs中为"local"，在浏览器中为"external"
	 * @type {String}
	 * @see {@link https://www.google.com/search?q=site%3Assp.shillest.net%2Fukadoc%2F+SecurityLevel}
	 */
	default_security_level: String;

	/**
	 * 自身代理
	 */
	proxy: jsstp_t;

	/**
	 * 基础jsstp对象
	 * @param {String} sender_name 对象与服务器交互时的发送者名称
	 * @param {String} host 目标服务器地址
	 * @returns {jsstp_t}
	 */
	/*@__PURE__*/constructor(sender_name?: String, host?: String);
	/**
	 * 修改host
	 * @param {string} host
	 * @group Properties
	 */
	set host(host: string);
	/*@__PURE__*/get host(): string;
	/**
	 * 修改sendername
	 * @param {String} sender_name
	 * @group Properties
	 */
	set sendername(sender_name: String);
	/*@__PURE__*/get sendername(): String;
	/**
	 * 以文本发送报文并以文本接收返信
	 * @param {any} info 报文体（文本）
	 * @returns {Promise<String|undefined>} 返回一个promise  
	 * 若一切正常其内容为发送后得到的返回值，否则为`undefined`
	 * @group Basic Send Methods
	 */
	row_send(info: any): Promise<String | undefined>;
	/**
	 * 发送报文，但是不对返回结果进行处理
	 * @param {String} sstphead 报文头
	 * @param {Object} info 报文体
	 * @returns {Promise<String|undefined>} 返回一个promise  
	 * 若一切正常其内容为发送后得到的返回值，否则为`undefined`
	 * @group Basic Send Methods
	 */
	costom_text_send(sstphead: String, info: Object): Promise<String | undefined>;
	/**
	 * 发送报文
	 * @param {String} sstphead 报文头
	 * @param {Object} info 报文体
	 * @returns {Promise<sstp_info_t>} 返回一个promise
	 * @group Basic Send Methods
	 */
	costom_send(sstphead: String, info: Object): Promise<sstp_info_t>;
	
	/**
	 * 获取指定方法的调用器
	 * @param {String} method_name 方法名称
	 * @returns {{
	 * 	(info: Object): Promise<sstp_info_t>,
	 * 	get_raw(info: Object): Promise<String>
	 * }} 调用器
	 * @group Caller Methods
	 */
	/*@__PURE__*/get_caller_of_method(method_name: String): method_caller;
	/**
	 * 获取指定事件的调用器
	 * @param {String} event_name 事件名称
	 * @param {String|undefined} method_name 方法名称
	 * @returns {{(info: Object) => Promise<sstp_info_t>}} 调用器
	 * @group Caller Methods
	 */
	/*@__PURE__*/get_caller_of_event(event_name: String, method_name?: String): common_event_caller;
	/**
	 * 用于获取指定事件的简单调用器
	 * @param {String} event_name 事件名称
	 * @param {String|undefined} method_name 方法名称
	 * @returns {{(info: Object) => Promise<sstp_info_t>}} 调用器
	 * @group Caller Methods
	 */
	/*@__PURE__*/get_simple_caller_of_event(event_name: String, method_name?: String): simple_event_caller;
	/**
	 * 用于获取指定事件的简单调用器的代理
	 * @returns {Proxy}
	 * @example
	 * jsstp.event.OnTest("test");
	 * @group Indexer Members
	 */
	/*@__PURE__*/get event(): {
		[event_name: string]: simple_event_caller
	}
	/**
	 * 判断是否存在某个事件
	 * 若可能频繁调用，使用{@link ghost_events_queryer_t}（通过{@link jsstp_t.new_event_queryer}获取）来查询
	 * @param {String} event_name 事件名
	 * @param {String} security_level 安全等级
	 * @returns {Promise<Boolean>} 是否存在
	 * @example
	 * jsstp.has_event("OnTest").then(result => console.log(result));
	 * @example
	 * //示例代码(AYA):
	 * SHIORI_EV.On_Has_Event : void {
	 * 	_event_name=reference.raw[0]
	 * 	_SecurityLevel=reference.raw[1]
	 * 	if !_SecurityLevel
	 * 		_SecurityLevel=SHIORI_FW.SecurityLevel
	 * 	if SUBSTR(_event_name,0,2) != 'On'
	 * 		_event_name='On_'+_event_name
	 * 	_result=0
	 * 	if TOLOWER(_SecurityLevel) == 'external'
	 * 		_event_name='ExternalEvent.'+_event_name
	 * 	_result=ISFUNC(_event_name)
	 * 	if !_result
	 * 		_result=ISFUNC('SHIORI_EV.'+_event_name)
	 * 	SHIORI_FW.Make_X_SSTP_PassThru('Result',_result)
	 * }
	 * SHIORI_EV.ExternalEvent.On_Has_Event{
	 * 	SHIORI_EV.On_Has_Event
	 * }
	 */
	/*@__PURE__*/has_event(event_name: String, security_level?: String): Promise<Boolean>;
	/**
	 * 以约定好的结构获取支持的事件，需要ghost支持`Get_Supported_Events`事件
	 * 若不确定ghost的支持情况，使用{@link ghost_events_queryer_t}（通过{@link jsstp_t.new_event_queryer}获取）来查询
	 * @returns {Promise<{local:string[],external:string[]}>} 包含local和external两个数组的Object
	 * @example
	 * jsstp.get_supported_events().then(result => console.log(result));
	 * @example
	 * //示例代码(AYA):
	 * SHIORI_EV.On_Get_Supported_Events: void {
	 * 	_L=GETFUNCLIST('On')
	 * 	_base_local_event_funcs=IARRAY
	 * 	foreach _L;_func{
	 * 		if SUBSTR(_func,2,1) == '_'
	 * 			_func=SUBSTR(_func,3,STRLEN(_func))
	 * 		_base_local_event_funcs,=_func
	 * 	}
	 * 	_L=GETFUNCLIST('SHIORI_EV.On')
	 * 	foreach _L;_func{
	 * 		if SUBSTR(_func,12,1) == '_'
	 * 			_func=SUBSTR(_func,13,STRLEN(_func))
	 * 		_base_local_event_funcs,=_func
	 * 	}
	 * 	SHIORI_FW.Make_X_SSTP_PassThru('local',ARRAYDEDUP(_base_local_event_funcs))
	 * 	_L=GETFUNCLIST('ExternalEvent.On')
	 * 	_base_external_event_funcs=IARRAY
	 * 	foreach _L;_func{
	 * 		if SUBSTR(_func,16,1) == '_'
	 * 			_func=SUBSTR(_func,17,STRLEN(_func))
	 * 		_base_external_event_funcs,=_func
	 * 	}
	 * 	_L=GETFUNCLIST('SHIORI_EV.ExternalEvent.On')
	 * 	foreach _L;_func{
	 * 		if SUBSTR(_func,26,1) == '_'
	 * 			_func=SUBSTR(_func,27,STRLEN(_func))
	 * 		_base_external_event_funcs,=_func
	 * 	}
	 * 	SHIORI_FW.Make_X_SSTP_PassThru('external',ARRAYDEDUP(_base_external_event_funcs))
	 * }
	 * SHIORI_EV.ExternalEvent.On_Get_Supported_Events{
	 * 	SHIORI_EV.On_Get_Supported_Events
	 * }
	 */
	/*@__PURE__*/get_supported_events(): Promise<{
		local: string[],
		external: string[]
	}>;
	/**
	 * 获取fmo信息
	 * @returns {Promise<fmo_info_t>} fmo信息
	 * @example
	 * let fmo=await jsstp.get_fmo_infos();
	 * if(fmo.available)
	 * 	console.log(fmo);
	 */
	/*@__PURE__*/get_fmo_infos(): Promise<fmo_info_t>;
	/**
	 * 获取当前ghost是否可用
	 * @returns {Promise<Boolean>} ghost是否可用
	 * @example
	 * if(await jsstp.available())
	 * 	//do something
	 * else
	 * 	console.error("ghost不可用,请检查ghost是否启动");
	 */
	/*@__PURE__*/available(): Promise<Boolean>;
	/**
	 * 获取当前ghost是否可用
	 * @returns {Promise} ghost是否可用
	 * @example
	 * jsstp.then(() => {
	 * 	//do something
	 * });
	 * //or
	 * await jsstp;
	 * @group PromiseLike Methods
	 */
	/*@__PURE__*/then<result_T,reject_T>(resolve: (value?: jsstp_t) => result_T, reject?: (reason?: any) => reject_T): Promise<result_T|reject_T>;
	/**
	 * 获取一个用于查询ghost所支持事件的queryer
	 * @returns {Promise<ghost_events_queryer_t>} 查询支持事件的queryer
	 * @example
	 * jsstp.new_event_queryer().then(queryer => 
	 * 	queryer.check_event("OnTest").then(result =>
	 * 		console.log(result)
	 * 	)
	 * );
	 */
	/*@__PURE__*/new_event_queryer(): Promise<ghost_events_queryer_t>;
}

/**
 * 一个可用函数初始化的可扩展的函数类型，用于更为可读的派生类函数类型
 */
declare class ExtensibleFunction<args_T extends Array<any>,return_T> extends Function {
	/**
	 * 自函数实例初始化
	 * @param {Function} func
	 * @returns {ExtensibleFunction}
	 */
	constructor(func: (...args: args_T) => return_T);
	/**
     * 调用函数，用指定的对象代替函数的this值，用指定的数组代替函数的参数。
     * @param thisArg 将被用作this对象的对象。
     * @param argArray 一组要传递给函数的参数。
     */
    apply(thisArg: (...args: args_T) => return_T, argArray?: args_T): return_T;

    /**
     * 调用一个对象的方法，用另一个对象代替当前对象。
     * @param thisArg 将被用作当前对象的对象。
     * @param argArray 要传递给方法的参数列表。
     */
    call(thisArg: (...args: args_T) => return_T, ...argArray: args_T): return_T;

    /**
     * 对于一个给定的函数，创建一个绑定的函数，其主体与原函数相同。
     * 绑定函数的this对象与指定的对象相关联，并具有指定的初始参数。
     * @param thisArg 一个对象，this关键字可以在新函数中引用。
     * @param argArray 一个要传递给新函数的参数列表。
     */
    bind(thisArg: (...args: args_T) => return_T, ...argArray: any): (...args: args_T) => return_T;
}

/**
 * ghost事件查询器
 * @example
 * let ghost_events_queryer = jsstp.new_event_queryer();
 * if(!ghost_events_queryer.available)
 * 	console.log("当前ghost不支持事件查询");
 * if(ghost_events_queryer.has_event("OnBoom"))
 * 	jsstp.OnBoom();
 * @alias jsstp.ghost_events_queryer_t
 * @see {@link jsstp_t.new_event_queryer}
 */
declare class ghost_events_queryer_t extends ExtensibleFunction<string[],Promise<Boolean>> {
	/**
	 * 构造一个事件查询器
	 * @param {jsstp_t} base_jsstp
	 * @returns {void}
	 */
	/*@__PURE__*/constructor(base_jsstp: jsstp_t);
	/**
	 * 检查事件是否存在，ghost至少需要`Has_Event`事件的支持，并可以通过提供`Get_Supported_Events`事件来提高效率
	 * @param {String} event_name
	 * @param {String|undefined} security_level
	 * @returns {Promise<Boolean>}
	 * @example
	 * let result = await ghost_events_queryer.check_event("On_connect");
	 * @see 基于 {@link jsstp_t.has_event} 和 {@link jsstp_t.get_supported_events}
	 */
	/*@__PURE__*/check_event(event_name: String, security_level?: String): Promise<Boolean>;
	/**
	 * 调用声明
	 * 检查事件是否存在，ghost至少需要`Has_Event`事件的支持，并可以通过提供`Get_Supported_Events`事件来提高效率
	 * @param {String} event_name
	 * @param {String|undefined} security_level
	 * @returns {Promise<Boolean>}
	 * @example
	 * let result = await ghost_events_queryer("On_connect");
	 * @see 基于 {@link ghost_events_queryer_t.check_event}
	 */
	/*@__PURE__*///**remove from dist**//(event_name: String, security_level?: String): Promise<Boolean>;
	/**
	 * 检查是否能够检查事件
	 * @returns {Promise<Boolean>}
	 * @example
	 * if(!ghost_events_queryer.available)
	 * 	console.error("无法检查事件");
	 */
	/*@__PURE__*/get available(): Boolean;
	/**
	 * 检查是否能够使用`Get_Supported_Events`快速获取支持的事件列表
	 * @returns {Promise<Boolean>}
	 * @example
	 * if(!ghost_events_queryer.fast_query_available)
	 * 	console.info("无法快速获取支持的事件列表");
	 * else
	 * 	console.info("好哦");
	 * @description 如果不支持也只是会变慢，`check_event`仍然可以使用
	 */
	/*@__PURE__*/get fast_query_available(): Boolean;
	/**
	 * @returns {Promise<ghost_events_queryer_t>} this
	 */
	reset(): Promise<ghost_events_queryer_t>;
	/**
	 * @returns {Promise<ghost_events_queryer_t>} this
	 */
	init(): Promise<ghost_events_queryer_t>;
	clear(): void;
}

//构建一个包装器与http://localhost:9801/api/sstp/v1通信。
//发信方法：Content-Type: text/plain HTTP/1.1でPOST
//收信方法：HTTP/1.1 200 OKのContent-Type: text/plain



//定义一个包装器
/**
 * sstp包装器
 * @example
 * jsstp.SEND({
 *   Event: "OnTest",
 *   Script: "\\s[0]Hell Wold!\\e"
 * });
 * @var jsstp
 * @type {jsstp_t}
 * @global
 */
declare var jsstp: jsstp_t;

export { base_sstp_info_t, jsstp as default, fmo_info_t, ghost_events_queryer_t, jsstp, jsstp_t, sstp_info_t };
