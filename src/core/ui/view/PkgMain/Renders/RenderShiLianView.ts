import { LogicSceneType } from "../../../../../logicScene/LogicSceneType";
import { NotifyConst } from "../../../../common/NotifyConst";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { GComponentExtend } from "../../../core/interfaces";
import RenderShiLian from "../../../ui/PkgMain/RenderShiLian";

export class RenderShiLianView extends ExtensionClass<GComponentExtend, RenderShiLian>(RenderShiLian) {

    protected override onConstruct(): void {
        super.onConstruct();
        this.BtnEnter.onClick(this, this.dispatch, [ NotifyConst.EnterScene, LogicSceneType.GameScene ]);
    }
}