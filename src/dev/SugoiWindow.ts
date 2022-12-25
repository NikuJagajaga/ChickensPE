class SugoiWindow {

    static screenHeight = UI.getScreenHeight();

    private whInv: {w: number, h: number};
    private whMain: {w: number, h: number};
    private borderPos: number; //200 to 800
    private paddingLR: number;

    private group: UI.WindowGroup;
    private winInv: UI.Window;
    private winMain: UI.Window;
    private winOvl: UI.Window;

    constructor(){

        this.whInv = {w: 180, h: 120};
        this.whMain = {w: 400, h: 300};
        this.borderPos = 500;
        this.paddingLR = 20;

        this.group = new UI.WindowGroup();

        this.winInv = new UI.Window({
            location: this.createLocationInv(),
            drawing: [
                {type: "background", color: Color.LTGRAY}
            ],
            elements: {

            }
        });

        this.winMain = new UI.Window({
            location: this.createLocationMain(),
            drawing: [
                {type: "background", color: Color.WHITE}
            ],
            elements: {

            }
        });

        this.winOvl = new UI.Window({
            location: {x: 0, y: 0, width: 1000, height: SugoiWindow.screenHeight},
            drawing: [
                {type: "background", color: Color.TRANSPARENT}
            ],
            elements: {

                $scroll: {type: "scroll", x: 100, y: SugoiWindow.screenHeight - 100, length: 800, onTouchEvent: (elem, event) => {
                    let pos = Math.round(event.localX * 600);
                    pos = Math.round(pos / 10) * 10;
                    event.localX = pos / 600;
                    this.scrollBorder(pos + 200);
                }}

            }
        });

        this.winInv.setInventoryNeeded(true);
        //this.winOvl.setTouchable(false);
        this.winOvl.setAsGameOverlay(true);

        this.group.addWindowInstance("inv", this.winInv);
        this.group.addWindowInstance("main", this.winMain);
        this.group.addWindowInstance("ovl", this.winOvl);

        this.group.setCloseOnBackPressed(true);

    }

    createLocationInv(): UI.WindowLocationParams {
        let x = this.paddingLR;
        let width = this.borderPos - this.paddingLR * 2;
        let height = width / this.whInv.w * this.whInv.h;
        if(height > SugoiWindow.screenHeight){
            height = SugoiWindow.screenHeight;
            width = height / this.whInv.h * this.whInv.w;
            x = (this.borderPos - width) / 2;
        }
        return {x: x, y: 0, width: width, height: height};
    }

    createLocationMain(): UI.WindowLocationParams {
        let x = this.borderPos + this.paddingLR;
        let width = (1000 - this.borderPos) - this.paddingLR * 2;
        let height = width / this.whMain.w * this.whMain.h;
        if(height > SugoiWindow.screenHeight){
            height = SugoiWindow.screenHeight;
            width = height / this.whMain.h * this.whMain.w;
            x = (1000 - this.borderPos - width) / 2;
        }
        return {x: x, y: 0, width: width, height: height};
    }

    scrollBorder(pos: number): void {
        if(this.borderPos === pos){
            return;
        }
        alert("scroll" + pos);
        this.borderPos = Math_clamp(pos, 200, 800);
        const locInv = this.createLocationInv();
        const locMain = this.createLocationMain();
        this.winInv.getLocation().set(locInv.x, locInv.y, locInv.width, locInv.height);
        this.winMain.getLocation().set(locMain.x, locMain.y, locMain.width, locMain.height);
        this.winInv.forceRefresh();
        this.winMain.forceRefresh();
    }

    get window(): UI.WindowGroup {
        return this.group;
    }

}


const TestWindow = new SugoiWindow();


IDRegistry.genBlockID("test_te");
Block.createBlock("test_te", [{name: "Test TE", texture: [["stone", 0]], inCreative: true}]);

class TestTE extends TileEntityBase {

    getScreenByName(screenName: string): UI.IWindow {
        return TestWindow.window;
    }

}

TileEntity.registerPrototype(BlockID.test_te, new TestTE());