"use client";

import Image from "next/image";
import { Accordion, Panel } from "rsuite";
import product from "../../../public/images/shop/product.png";

const BackupBuddySpecs = () => {
  return (
    <section className="p-4">
      <div>
        <Accordion>
          <Panel header="Backup Buddy Full Specifications" eventKey="1">
            <div className="flex items-start mb-6">
              {/* Image */}
              <div className="w-1/2 flex justify-center items-center">
                <Image
                  src={product}
                  alt="Backup Buddy"
                  className="h-32 rounded-full"
                  width={128}
                  height={128}
                />
              </div>

              <div className="w-1/2">
                <h3 className="font-bold">Size & Weight</h3>
                <ul className="list-none">
                  <li>Face Width: 1.26 inches (31.9 mm)</li>
                  <li>Face Height: 0.31 inch (8.0 mm)</li>
                  <li>Band Length: Adjustable</li>
                  <li>Weight: 0.39 ounce (11 grams)</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="font-bold">Water Proof</div>
              <div>Rated IP67 (maximum depth of 1 meter up to 30 minutes)</div>

              <div className="font-bold">Connectivity</div>
              <div>
                <ul>
                  <li>NFC Tap</li>
                  <li>QR Code Scan</li>
                </ul>
              </div>

              <div className="font-bold">Environmental Requirements</div>
              <div>
                <ul>
                  <li>
                    Operating ambient temperature: -13 to 158 F (-25 to 70 C)
                  </li>{" "}
                  <li>NFC Microchip Data Retention Time: 10 years</li>{" "}
                  <li>Read Range: 0.5 inch (12 mm)</li>
                </ul>
              </div>

              <div className="font-bold">Materials</div>
              <div>
                <ul>
                  <li>Band: Nylon</li>
                  <li>Links: Stainless Steel</li>
                  <li>Face: Maple Hardwood & Plexiglass</li>
                </ul>
              </div>
            </div>
          </Panel>
        </Accordion>
      </div>
    </section>
  );
};

export default BackupBuddySpecs;
