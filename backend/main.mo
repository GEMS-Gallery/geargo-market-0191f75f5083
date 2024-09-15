import Bool "mo:base/Bool";
import Func "mo:base/Func";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import Float "mo:base/Float";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Text "mo:base/Text";

actor CarParts {
    // Define the CarPart type
    public type CarPart = {
        cpid: Text;
        title: Text;
        description: Text;
        stock: Nat;
        price: Float;
        imageUrl: ?Text;
    };

    // Create a stable variable to store car parts
    private stable var carPartsEntries : [(Text, CarPart)] = [];
    private var carParts = HashMap.HashMap<Text, CarPart>(0, Text.equal, Text.hash);

    // System functions for upgrades
    system func preupgrade() {
        carPartsEntries := Iter.toArray(carParts.entries());
    };

    system func postupgrade() {
        carParts := HashMap.fromIter<Text, CarPart>(carPartsEntries.vals(), 1, Text.equal, Text.hash);
    };

    // Function to add a new car part
    public func addCarPart(cp: CarPart) : async () {
        carParts.put(cp.cpid, cp);
    };

    // Function to get a car part by CPID
    public query func getCarPart(cpid: Text) : async ?CarPart {
        carParts.get(cpid)
    };

    // Function to update a car part
    public func updateCarPart(cp: CarPart) : async Bool {
        switch (carParts.get(cp.cpid)) {
            case (null) { false };
            case (?_) {
                carParts.put(cp.cpid, cp);
                true
            };
        }
    };

    // Function to delete a car part
    public func deleteCarPart(cpid: Text) : async Bool {
        switch (carParts.remove(cpid)) {
            case (null) { false };
            case (?_) { true };
        }
    };

    // Function to list all car parts
    public query func listCarParts() : async [CarPart] {
        Iter.toArray(carParts.vals())
    };
}