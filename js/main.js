require(['Objects','controller', 'view', 'Object', 'PowerSupply', 'Wire', 'Ground', 'Resistor', 'snap', 'CircuitHandler'],
        function(Objects, controller, view, Object, PowerSupply, Wire, Ground, Resistor, snap, CircuitHandler) {
            
             
            
            Objects.add(new PowerSupply({
                x: 200,
                y: 200         
            }));
            
             Objects.add(new Wire({
                x: 100,
                y: 380
            }));
            
            Objects.add(new Ground({
                x: 250,
                y: 300
            }));
            
             Objects.add(new Ground({
                x: 400,
                y: 400
            }));
            
             Objects.add(new Wire({
                x: 350,
                y: 300
            }));
 		Objects.add(new Resistor({
                x: 250,
                y: 400
            }));

        });


